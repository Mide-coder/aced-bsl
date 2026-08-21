export interface PublicUserSource {
  id: string;
  pseudonym: string;
  email: string;
  role: string;
  xrplWalletAddress: string | null;
  isVerifiedTutor: boolean;
  isAdmin: boolean;
  hourlyRateKobo: number | null;
  ratingAvg: number;
  ratingCount: number;
}

export function toPublicUser(user: PublicUserSource) {
  return {
    id: user.id,
    pseudonym: user.pseudonym,
    email: user.email,
    role: user.role,
    xrplWalletAddress: user.xrplWalletAddress,
    isVerifiedTutor: user.isVerifiedTutor,
    isAdmin: user.isAdmin,
    hourlyRateKobo: user.hourlyRateKobo,
    ratingAvg: user.ratingAvg,
    ratingCount: user.ratingCount,
  };
}
