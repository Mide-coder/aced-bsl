import { Router } from "express";
import {
  addCourseInterest,
  listMyCourseInterests,
  removeCourseInterest,
  updateProfile,
} from "../controllers/users.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { addCourseInterestSchema, updateProfileSchema } from "../types/schemas";

const router = Router();

router.patch(
  "/me",
  requireAuth,
  validateBody(updateProfileSchema),
  updateProfile
);

router.get("/me/courses", requireAuth, listMyCourseInterests);
router.post(
  "/me/courses",
  requireAuth,
  validateBody(addCourseInterestSchema),
  addCourseInterest
);
router.delete("/me/courses/:id", requireAuth, removeCourseInterest);

export default router;
