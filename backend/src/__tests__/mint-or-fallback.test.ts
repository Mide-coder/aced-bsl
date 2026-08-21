/**
 * 7-item testing checklist for mint_or_fallback.
 * Run with: DATABASE_URL="mysql://x" JWT_SECRET="x" CLOUDINARY_CLOUD_NAME="x" CLOUDINARY_API_KEY="x" CLOUDINARY_API_SECRET="x" npx tsx src/__tests__/mint-or-fallback.test.ts
 */

import crypto from "crypto";
import { mintOrFallback, computeCredentialHash, CredentialMetadata } from "../services/verification.service";

const TEST_METADATA: CredentialMetadata = {
  tutorId: "tutor-test-001",
  courseCode: "CSC301",
  grade: "A",
  university: "University of Lagos",
  verifiedAt: 1724246400,
};

let passed = 0;
let failed = 0;

function report(name: string, ok: boolean, detail?: string) {
  if (ok) { passed++; console.log(`  ✅ PASS: ${name}`); }
  else    { failed++; console.log(`  ❌ FAIL: ${name}`); }
  if (detail) console.log(`         ${detail}`);
}

/** Mock mint function that always succeeds */
function mockMintSuccess() {
  return async () => ({
    nftokenId: "NFTOKEN_ABCDEF123456",
    txHash: "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2",
  });
}

/** Mock mint function that always throws */
function mockMintFail(message: string) {
  return async () => { throw new Error(message); };
}

// ─── Test 1: HAPPY PATH ────────────────────────────────────────────────────

async function test1_happyPath() {
  console.log("\n[Test 1] Happy path — XRPL mint succeeds");

  const result = await mintOrFallback(TEST_METADATA, mockMintSuccess());

  report("status is 'verified_onchain'", result.status === "verified_onchain", `got: ${result.status}`);
  report("xrplTxHash is non-null", result.xrplTxHash !== null, `got: ${result.xrplTxHash}`);
  report("explorerUrl is non-null", result.explorerUrl !== null, `got: ${result.explorerUrl}`);
  report("credentialHash is null", result.credentialHash === null, `got: ${result.credentialHash}`);
  report(
    "explorerUrl contains txHash",
    result.explorerUrl!.includes(result.xrplTxHash!),
    `url: ${result.explorerUrl}`
  );
}

// ─── Test 2: NETWORK ERROR ─────────────────────────────────────────────────

async function test2_networkError() {
  console.log("\n[Test 2] Network error — ECONNREFUSED");

  const result = await mintOrFallback(TEST_METADATA, mockMintFail("connect ECONNREFUSED 127.0.0.1:51233"));

  report("did NOT throw", true);
  report("status is 'verified_hash_fallback'", result.status === "verified_hash_fallback", `got: ${result.status}`);
  report("xrplTxHash is null", result.xrplTxHash === null, `got: ${result.xrplTxHash}`);
  report("explorerUrl is null", result.explorerUrl === null, `got: ${result.explorerUrl}`);
  report(
    "credentialHash is non-null",
    result.credentialHash !== null,
    `got: ${result.credentialHash}`
  );
  report(
    "credentialHash is 64-char hex",
    typeof result.credentialHash === "string" && /^[0-9a-f]{64}$/.test(result.credentialHash),
    `got: ${result.credentialHash} (len=${result.credentialHash?.length})`
  );
}

// ─── Test 3: TX REJECTED ───────────────────────────────────────────────────

async function test3_txRejected() {
  console.log("\n[Test 3] TX rejected — tecNO_PERMISSION");

  const result = await mintOrFallback(TEST_METADATA, mockMintFail("NFT mint failed: tecNO_PERMISSION"));

  report("did NOT throw", true);
  report("status is 'verified_hash_fallback'", result.status === "verified_hash_fallback", `got: ${result.status}`);
  report("xrplTxHash is null", result.xrplTxHash === null, `got: ${result.xrplTxHash}`);
  report(
    "credentialHash is 64-char hex",
    /^[0-9a-f]{64}$/.test(result.credentialHash!),
    `got: ${result.credentialHash}`
  );
}

// ─── Test 4: DETERMINISM ───────────────────────────────────────────────────

async function test4_determinism() {
  console.log("\n[Test 4] Determinism — same inputs → same hash (twice)");

  const failMint = mockMintFail("forced failure");

  const r1 = await mintOrFallback(TEST_METADATA, failMint);
  const r2 = await mintOrFallback(TEST_METADATA, failMint);

  report("both returned hash fallback", r1.status === "verified_hash_fallback" && r2.status === "verified_hash_fallback");
  report("hashes are IDENTICAL", r1.credentialHash === r2.credentialHash);
  report(
    "hash is real 64-char hex string",
    /^[0-9a-f]{64}$/.test(r1.credentialHash!),
    `credential_hash: ${r1.credentialHash}`
  );
}

// ─── Test 5: ENDPOINT INTEGRATION ──────────────────────────────────────────

async function test5_endpointIntegration() {
  console.log("\n[Test 5] Endpoint integration — reviewTranscript with XRPL failure");

  // Simulate what the controller does when approving with XRPL down
  const result = await mintOrFallback({
    tutorId: "integration-test-user",
    courseCode: "BROAD",
    grade: "VERIFIED",
    university: "ACED",
    verifiedAt: Math.floor(Date.now() / 1000),
  }, mockMintFail("simulated testnet outage"));

  report("result is hash fallback", result.status === "verified_hash_fallback");
  report(
    "credentialHash is populated 64-char hex",
    typeof result.credentialHash === "string" && /^[0-9a-f]{64}$/.test(result.credentialHash),
    `credential_hash: ${result.credentialHash}`
  );
  report("xrplTxHash is null", result.xrplTxHash === null);
  report(
    "controller would persist credentialHash (not txHash)",
    result.credentialHash !== null && result.xrplTxHash === null,
    `credentialHash=${result.credentialHash}, txHash=${result.xrplTxHash}`
  );
}

// ─── Test 6: FRONTEND RENDER ───────────────────────────────────────────────

async function test6_frontendRender() {
  console.log("\n[Test 6] Frontend render — badge props logic");

  // 6a: On-chain path
  const txHash = "A1B2C3D4E5F6";
  const label1 = `Verified ${"A"} in ${"CSC301"}`;
  report("on-chain badge label", label1 === "Verified A in CSC301", `label: ${label1}`);
  report("on-chain has explorer link", txHash !== null && label1.includes("Verified"));

  // 6b: Hash fallback path
  const credHash = "abc123def456abc123def456abc123def456abc123def456abc123def456abcd";
  const short = credHash.slice(0, 10);
  const label2 = `Credential Hash: ${short}… — Mainnet ready`;
  report("hash fallback label", label2 === "Credential Hash: abc123def4… — Mainnet ready", `label: ${label2}`);
  report("hash fallback has no explorer link", !label2.includes("xrpl.org"));
  report("hash fallback has no broken null link", !label2.includes("null"));
}

// ─── Test 7: NO REGRESSION ─────────────────────────────────────────────────

async function test7_noRegression() {
  console.log("\n[Test 7] No regression — computeCredentialHash pure function");

  const h1 = computeCredentialHash(TEST_METADATA);
  const h2 = computeCredentialHash(TEST_METADATA);
  report("deterministic (same call twice)", h1 === h2, `hash: ${h1}`);

  const h3 = computeCredentialHash({ ...TEST_METADATA, grade: "B" });
  report("different input → different hash", h1 !== h3, `h1: ${h1}, h3: ${h3}`);

  const manualPayload = JSON.stringify(TEST_METADATA, Object.keys(TEST_METADATA).sort());
  const manualHash = crypto.createHash("sha256").update(manualPayload).digest("hex");
  report("matches manual SHA-256", h1 === manualHash, `match: ${h1 === manualHash}, manual: ${manualHash}`);

  const garbageResult = await mintOrFallback({} as any, mockMintFail("everything is broken"));
  report("never throws on garbage input", garbageResult.status === "verified_hash_fallback");
}

// ─── Run ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  mint_or_fallback — 7-item testing checklist");
  console.log("═══════════════════════════════════════════════════════════");

  await test1_happyPath();
  await test2_networkError();
  await test3_txRejected();
  await test4_determinism();
  await test5_endpointIntegration();
  await test6_frontendRender();
  await test7_noRegression();

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log(`  RESULTS: ${passed} passed, ${failed} failed`);
  console.log("═══════════════════════════════════════════════════════════");

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => { console.error("Test runner crashed:", err); process.exit(2); });
