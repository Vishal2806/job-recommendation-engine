import express from "express";
import { createCandidate } from "../controllers/candidateController.js";
import {
  getCandidateRecommendations
} from "../controllers/recommendationController.js";

const router = express.Router();

router.post("/", createCandidate);

router.get(
  "/:candidateId/recommendations",
  getCandidateRecommendations
);

export default router;