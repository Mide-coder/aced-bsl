import { Router } from "express";
import {
  burnMyNFT,
  createTestnetWallet,
  getMyLedgerNFTs,
  getNFTsForAddress,
  listMyCredentials,
  mintCredential,
} from "../controllers/xrpl.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { mintCredentialSchema } from "../types/schemas";

const router = Router();

// Wallet lifecycle (testnet demo convenience)
router.post("/wallet/testnet", requireAuth, createTestnetWallet);

// Credential badge minting
router.post("/mint", requireAuth, validateBody(mintCredentialSchema), mintCredential);
router.get("/credentials/me", requireAuth, listMyCredentials);
router.delete("/nfts/:nftokenId", requireAuth, burnMyNFT);

// Read-only lookups
router.get("/nfts/me", requireAuth, getMyLedgerNFTs);
router.get("/nfts/:address", getNFTsForAddress); // public — anyone can verify a badge

export default router;
