# ACED Backend

Express + TypeScript + Prisma (PostgreSQL) API for ACED — a pseudonymous
peer-tutoring marketplace with blockchain-verified credentials.

This scaffold covers the two pieces you asked for:

- **Auth** — register / login / me, JWT-based, bcrypt password hashing
- **XRPL NFT minting (testnet)** — mint a "Verified {grade} in {courseCode}"
  credential badge as an NFT, list a wallet's NFTs, burn an NFT — ported from
  the dev guide's `mint-nfts.js` into a server-side `xrpl.js` service.

## Stack

- Node.js + Express + TypeScript
- Prisma ORM → PostgreSQL
- `xrpl` (xrpl.js) → XRPL Testnet
- JWT auth (`jsonwebtoken`) + `bcryptjs`
- `zod` for request validation

## Setup

```bash
npm install
cp .env.example .env
# edit .env — at minimum set DATABASE_URL and JWT_SECRET

npx prisma migrate dev --name init   # creates tables
npm run dev                          # http://localhost:4000
```

You do **not** need to set `XRPL_ISSUER_SEED` to get started — the first
mint call will auto-generate and faucet-fund a fresh testnet wallet, and log
its seed to the console so you can save it into `.env` for reuse.

## API

### Auth (`/api/auth`)

| Method | Path        | Auth | Body |
|--------|-------------|------|------|
| POST   | `/register` | –    | `{ pseudonym, email, password, role? }` |
| POST   | `/login`    | –    | `{ email, password }` → `{ accessToken, user }` |
| GET    | `/me`       | ✅   | – |

Send the token as `Authorization: Bearer <accessToken>` on protected routes.

### XRPL (`/api/xrpl`)

| Method | Path                    | Auth | Description |
|--------|-------------------------|------|--------------|
| POST   | `/wallet/testnet`       | ✅   | Generates + faucet-funds a testnet wallet, attaches it to your account |
| POST   | `/mint`                 | ✅   | Mints a credential NFT. `{ courseCode, grade, proofUri, sendToOwnWallet? }` |
| GET    | `/credentials/me`       | ✅   | Local DB record of your minted credentials |
| GET    | `/nfts/me`               | ✅   | Live lookup of your wallet's NFTs, straight from the ledger |
| GET    | `/nfts/:address`         | –    | Public — verify anyone's badges by wallet address |
| DELETE | `/nfts/:nftokenId`       | ✅   | Burns an NFT you own |

Example flow:

```bash
# 1. Register + log in
curl -X POST localhost:4000/api/auth/register -H 'Content-Type: application/json' \
  -d '{"pseudonym":"quiet_falcon","email":"tutor@example.com","password":"supersecret1","role":"tutor"}'

curl -X POST localhost:4000/api/auth/login -H 'Content-Type: application/json' \
  -d '{"email":"tutor@example.com","password":"supersecret1"}'
# → { "accessToken": "...", ... }

# 2. Create a testnet wallet for this account
curl -X POST localhost:4000/api/xrpl/wallet/testnet -H "Authorization: Bearer <token>"

# 3. Mint a credential badge
curl -X POST localhost:4000/api/xrpl/mint -H "Authorization: Bearer <token>" \
  -H 'Content-Type: application/json' \
  -d '{"courseCode":"CSC301","grade":"A","proofUri":"https://res.cloudinary.com/.../transcript.pdf"}'
```

## Notes / next steps

- **Wallet custody**: storing `xrplWalletSeed` server-side is fine for a
  hackathon/testnet demo but is not production-safe. For mainnet, move to a
  non-custodial signing flow (e.g. Xumm/Crossmark) so ACED never holds keys.
- **Transcript verification**: this scaffold assumes a tutor's grade has
  already been verified (e.g. via manual review of an uploaded transcript)
  before `/mint` is called. Wire that check in before exposing `/mint`
  publicly — right now any authenticated user can mint a badge for
  themselves.
- **Escrow payments (Paystack)** and **Cloudinary uploads** from the PRD
  aren't in this scaffold — say the word and I'll add those routes next.
