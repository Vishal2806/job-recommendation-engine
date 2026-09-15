import express from "express";
import { createCandidate } from "../controllers/candidateController.js";

const router = express.Router();

router.post("/", createCandidate);

export default router;