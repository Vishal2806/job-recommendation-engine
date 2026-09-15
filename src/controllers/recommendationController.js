import { getRecommendations } from "../services/recommendationService.js";

export const getCandidateRecommendations = async (req, res) => {
  try {
    const { candidateId } = req.params;

    if (!Number.isInteger(Number(candidateId)) || Number(candidateId) <= 0) {
      return res.status(400).json({
        message: "Candidate ID must be a positive integer"
      });
    }

    const rawLimit = req.query.limit;
    const limit = rawLimit === undefined ? 5 : Number(rawLimit);

    if (!Number.isInteger(limit) || limit <= 0) {
      return res.status(400).json({
        message: "Limit must be a positive integer"
      });
    }

    const recommendations = await getRecommendations(
      candidateId,
      limit
    );

    if (recommendations === null) {
      return res.status(404).json({
        message: "Candidate not found"
      });
    }

    res.json({
      candidateId: Number(candidateId),
      count: recommendations.length,
      recommendations
    });
  } catch (error) {
    console.error(
      "Get recommendations error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to get recommendations"
    });
  }
};