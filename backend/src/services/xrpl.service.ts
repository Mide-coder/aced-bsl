import {
  Client,
  Wallet,
  NFTokenMintFlags,
  convertStringToHex,
  TransactionMetadata,
} from "xrpl";
import { env } from "../config/env";

/**
 * Ported from the ACED dev guide's mint-nfts.js (browser xrpl.js snippet) into a
 * server-side service. Same transaction shapes, same submitAndWait flow — just
 * running on a Node client instead of a browser wallet field.
 */

let cachedClient: Client | null = null;

async function getClient(): Promise<Client> {
  if (cachedClient?.isConnected()) return cachedClient;
  const client = new Client(env.XRPL_NETWORK);
  await client.connect();
  cachedClient = client;
  return client;
}

/**
 * The platform's own wallet, used to mint verified credential badges.
 * If XRPL_ISSUER_SEED isn't set (dev/testnet only), we generate + fund a
 * fresh wallet from the faucet the first time it's needed.
 */
let issuerWallet: Wallet | null = null;

async function getIssuerWallet(): Promise<Wallet> {
  if (issuerWallet) return issuerWallet;

  if (env.XRPL_ISSUER_SEED) {
    issuerWallet = Wallet.fromSeed(env.XRPL_ISSUER_SEED);
    return issuerWallet;
  }

  const client = await getClient();
  const { wallet } = await client.fundWallet();
  issuerWallet = wallet;
  console.warn(
    `[xrpl] No XRPL_ISSUER_SEED set — auto-funded a testnet issuer wallet: ${wallet.address}\n` +
      `[xrpl] Seed (save this to .env as XRPL_ISSUER_SEED to reuse it): ${wallet.seed}`
  );
  return issuerWallet;
}

export interface MintCredentialParams {
  courseCode: string;
  grade: string;
  proofUri: string;
  nftokenTaxon?: number;
  transferFee?: number;
  /** Recipient wallet address — if provided, the NFT is minted straight to them. */
  destination?: string;
}

export interface MintResult {
  nftokenId: string;
  txHash: string;
}

/**
 * Mints a "Verified {grade} in {courseCode}" credential NFT on the XRPL testnet.
 * URI encodes course code, grade, and the transcript proof link as JSON, hex-encoded
 * per the NFTokenMint spec (same convertStringToHex approach as the dev guide).
 */
export async function mintCredentialNFT(params: MintCredentialParams): Promise<MintResult> {
  const client = await getClient();
  const wallet = await getIssuerWallet();

  const metadata = JSON.stringify({
    courseCode: params.courseCode,
    grade: params.grade,
    proofUri: params.proofUri,
    issuedBy: "ACED",
  });

  const transactionParams: Record<string, unknown> = {
    TransactionType: "NFTokenMint",
    Account: wallet.classicAddress,
    URI: convertStringToHex(metadata),
    Flags: NFTokenMintFlags.tfTransferable,
    TransferFee: params.transferFee ?? 0,
    NFTokenTaxon: params.nftokenTaxon ?? 0,
  };

  if (params.destination) {
    transactionParams.Destination = params.destination;
  }

  const tx = await client.submitAndWait(transactionParams as never, { wallet });

  const meta = tx.result.meta as TransactionMetadata | string | undefined;
  if (!meta || typeof meta === "string" || meta.TransactionResult !== "tesSUCCESS") {
    const result = typeof meta === "string" ? meta : meta?.TransactionResult;
    throw new Error(`NFT mint failed: ${result ?? "unknown error"}`);
  }

  // The minted token's ID is emitted in the transaction metadata.
  const nftokenId = extractNftokenIdFromMeta(meta as unknown as Record<string, unknown>);
  if (!nftokenId) {
    throw new Error("Mint succeeded but NFTokenID could not be located in metadata");
  }

  return { nftokenId, txHash: tx.result.hash };
}

// meta.nftoken_id is populated on modern rippled versions; fall back to
// scanning AffectedNodes for older ones.
function extractNftokenIdFromMeta(meta: Record<string, unknown>): string | null {
  if (typeof meta.nftoken_id === "string") return meta.nftoken_id;

  const nodes = (meta.AffectedNodes as Array<Record<string, any>>) ?? [];
  for (const node of nodes) {
    const created = node.CreatedNode;
    if (created?.LedgerEntryType === "NFTokenPage") {
      const tokens = created.NewFields?.NFTokens ?? [];
      if (tokens.length > 0) return tokens[tokens.length - 1].NFToken.NFTokenID;
    }
    const modified = node.ModifiedNode;
    if (modified?.LedgerEntryType === "NFTokenPage") {
      const tokens = modified.FinalFields?.NFTokens ?? [];
      if (tokens.length > 0) return tokens[tokens.length - 1].NFToken.NFTokenID;
    }
  }
  return null;
}

export async function getAccountNFTs(address: string) {
  const client = await getClient();
  const response = await client.request({
    command: "account_nfts",
    account: address,
  });
  return response.result.account_nfts;
}

export async function burnNFT(nftokenId: string, wallet: Wallet): Promise<{ txHash: string }> {
  const client = await getClient();

  const tx = await client.submitAndWait(
    {
      TransactionType: "NFTokenBurn",
      Account: wallet.classicAddress,
      NFTokenID: nftokenId,
    } as never,
    { wallet }
  );

  const meta = tx.result.meta as TransactionMetadata | string | undefined;
  if (!meta || typeof meta === "string" || meta.TransactionResult !== "tesSUCCESS") {
    const result = typeof meta === "string" ? meta : meta?.TransactionResult;
    throw new Error(`NFT burn failed: ${result ?? "unknown error"}`);
  }

  return { txHash: tx.result.hash };
}

/** Generates + faucet-funds a brand new testnet wallet. Dev/demo convenience only. */
export async function createFundedTestnetWallet() {
  const client = await getClient();
  const { wallet, balance } = await client.fundWallet();
  return {
    address: wallet.classicAddress,
    seed: wallet.seed as string,
    balanceXrp: String(balance),
  };
}
