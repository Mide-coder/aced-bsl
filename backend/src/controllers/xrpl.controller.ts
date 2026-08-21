import { Request, Response } from "express";
import { Wallet } from "xrpl";
import { prisma } from "../config/prisma";
import {
  burnNFT,
  createFundedTestnetWallet,
  getAccountNFTs,
  mintCredentialNFT,
} from "../services/xrpl.service";
import { MintCredentialInput } from "../types/schemas";

/**
 * Creates + faucet-funds a testnet wallet and attaches it to the logged-in user.
 * Demo-only: for a real product, wallet keys should never touch the server —
 * use a non-custodial wallet flow instead.
 */
export async function createTestnetWallet(req: Request, res: Response) {
  const userId = req.user!.id;

  const wallet = await createFundedTestnetWallet();

  await prisma.user.update({
    where: { id: userId },
    data: { xrplWalletAddress: wallet.address, xrplWalletSeed: wallet.seed },
  });

  return res.status(201).json(wallet);
}

/**
 * Mints a "Verified {grade} in {courseCode}" credential NFT on the XRPL testnet
 * and stores a local index row. By default mints straight to the caller's own
 * wallet (send_to_own_wallet=true); set to false to leave it with the platform
 * issuer wallet (e.g. pending manual transfer).
 */
export async function mintCredential(req: Request, res: Response) {
  const userId = req.user!.id;
  const { courseCode, grade, proofUri, nftokenTaxon, transferFee, sendToOwnWallet } =
    req.body as MintCredentialInput;

  let destination: string | undefined;
  if (sendToOwnWallet) {
    if (!req.user!.xrplWalletAddress) {
      return res.status(400).json({
        error: "You need an XRPL wallet first — call POST /api/xrpl/wallet/testnet",
      });
    }
    destination = req.user!.xrplWalletAddress;
  }

  const { nftokenId, txHash } = await mintCredentialNFT({
    courseCode,
    grade,
    proofUri,
    nftokenTaxon,
    transferFee,
    destination,
  });

  const record = await prisma.credentialNFT.create({
    data: {
      userId,
      courseCode,
      grade,
      proofUri,
      nftokenId,
      txHash,
      nftokenTaxon: nftokenTaxon ?? 0,
    },
  });

  return res.status(201).json(record);
}

export async function listMyCredentials(req: Request, res: Response) {
  const credentials = await prisma.credentialNFT.findMany({
    where: { userId: req.user!.id },
    orderBy: { mintedAt: "desc" },
  });
  return res.json(credentials);
}

/** Live lookup straight from the ledger, for any address (public — no auth). */
export async function getNFTsForAddress(req: Request, res: Response) {
  const { address } = req.params;
  const nfts = await getAccountNFTs(address);
  return res.json({ address, nfts });
}

export async function getMyLedgerNFTs(req: Request, res: Response) {
  if (!req.user!.xrplWalletAddress) {
    return res.status(400).json({ error: "No XRPL wallet on this account yet" });
  }
  const nfts = await getAccountNFTs(req.user!.xrplWalletAddress);
  return res.json({ address: req.user!.xrplWalletAddress, nfts });
}

export async function burnMyNFT(req: Request, res: Response) {
  const { nftokenId } = req.params;

  if (!req.user!.xrplWalletSeed) {
    return res.status(400).json({ error: "No XRPL wallet on this account yet" });
  }

  const wallet = Wallet.fromSeed(req.user!.xrplWalletSeed);
  const result = await burnNFT(nftokenId, wallet);

  await prisma.credentialNFT.deleteMany({ where: { nftokenId, userId: req.user!.id } });

  return res.json({ burned: nftokenId, ...result });
}
