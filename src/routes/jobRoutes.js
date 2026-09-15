import express from "express";
import { createJob } from "../controllers/jobController.js";
import { validateJob } from "../validators/jobValidator.js";

const router = express.Router();

router.post("/", validateJob, createJob);

export default router;