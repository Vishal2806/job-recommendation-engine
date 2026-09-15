import { getRecommendations } from "../services/recommendationService.js";

export const getCandidateRecommendations = async (req, res) => {
  try {
    const { candidateId } = req.params;
    const limit = Number(req.query.limit) || 5;

    if (limit <= 0) {
      return res.status(400).json({
        message: "Limit must be greater than 0"
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