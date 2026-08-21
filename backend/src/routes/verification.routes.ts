import { Router } from "express";
import {
  listMyTranscripts,
  listMyVideos,
  uploadTranscript,
  uploadVideo,
} from "../controllers/verification.controller";
import { requireAuth } from "../middleware/auth.middleware";
import {
  uploadTranscript as uploadTranscriptMulter,
  uploadVideo as uploadVideoMulter,
} from "../middleware/upload.middleware";

const router = Router();

router.post(
  "/transcript",
  requireAuth,
  uploadTranscriptMulter.single("file"),
  uploadTranscript
);
router.get("/transcript/me", requireAuth, listMyTranscripts);

router.post(
  "/video",
  requireAuth,
  uploadVideoMulter.single("file"),
  uploadVideo
);
router.get("/video/me", requireAuth, listMyVideos);

export default router;
