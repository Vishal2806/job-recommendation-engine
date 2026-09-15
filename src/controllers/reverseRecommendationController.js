import { getCandidateRecommendationsForJob } from "../services/reverseRecommendationService.js";

export const getJobRecommendations = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!Number.isInteger(Number(jobId)) || Number(jobId) <= 0) {
      return res.status(400).json({
        message: "Job ID must be a positive integer"
      });
    }

    const rawLimit = req.query.limit;
    const limit = rawLimit === undefined ? 5 : Number(rawLimit);

    if (!Number.isInteger(limit) || limit <= 0) {
      return res.status(400).json({
        message: "Limit must be a positive integer"
      });
    }

    const recommendations =
      await getCandidateRecommendationsForJob(
        jobId,
        limit
      );

    if (recommendations === null) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json({
      jobId: Number(jobId),
      count: recommendations.length,
      recommendations
    });
  } catch (error) {
    console.error(
      "Get job recommendations error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to get job recommendations"
    });
  }
};