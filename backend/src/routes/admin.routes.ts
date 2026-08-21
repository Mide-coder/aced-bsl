import { Router } from "express";
import {
  listPendingTranscripts,
  listPendingVideos,
  reviewTranscript,
  reviewVideo,
} from "../controllers/admin.controller";
import { requireAdmin } from "../middleware/admin.middleware";
import { requireAuth } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { reviewVerificationSchema } from "../types/schemas";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/verifications/transcripts", listPendingTranscripts);
router.patch(
  "/verifications/transcripts/:id",
  validateBody(reviewVerificationSchema),
  reviewTranscript
);

router.get("/verifications/videos", listPendingVideos);
router.patch(
  "/verifications/videos/:id",
  validateBody(reviewVerificationSchema),
  reviewVideo
);

export default router;
