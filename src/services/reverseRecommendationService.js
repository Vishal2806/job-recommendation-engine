import { getJobById } from "./jobService.js";
import { getAllCandidates } from "./candidateService.js";
import { scoreJob } from "../scoring/scoreJob.js";

export const getCandidateRecommendationsForJob = async (
  jobId,
  limit = 5
) => {
  const job = await getJobById(jobId);

  if (!job) {
    return null;
  }

  const candidates = await getAllCandidates();

  const recommendations = candidates
    .map((candidate) => {
      const scoringResult = scoreJob(candidate, job);

      return {
        candidate,
        ...scoringResult
      };
    })
    .filter((recommendation) => recommendation.eligible)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return recommendations;
};