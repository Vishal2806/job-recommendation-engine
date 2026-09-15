import express from "express";
import { createJob } from "../controllers/jobController.js";
import { validateJob } from "../validators/jobValidator.js";
import {
  getJobRecommendations
} from "../controllers/reverseRecommendationController.js";

const router = express.Router();

router.post("/", validateJob, createJob);
router.get(
  "/:jobId/recommendations",
  getJobRecommendations
);

export default router;