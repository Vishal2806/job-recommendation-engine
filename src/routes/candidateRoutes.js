import express from "express";
import { createCandidate } from "../controllers/candidateController.js";
import {
  getCandidateRecommendations
} from "../controllers/recommendationController.js";
import { validateCandidate } from "../validators/candidateValidator.js";

const router = express.Router();

router.post("/", validateCandidate, createCandidate);

router.get(
  "/:candidateId/recommendations",
  getCandidateRecommendations
);

export default router;