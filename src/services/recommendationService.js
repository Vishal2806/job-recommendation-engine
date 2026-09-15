import { getCandidateById } from "./candidateService.js";
import { getAllJobs } from "./jobService.js";
import { scoreJob } from "../scoring/scoreJob.js";

export const getRecommendations = async (candidateId, limit = 5) => {
  const candidate = await getCandidateById(candidateId);

  if (!candidate) {
    return null;
  }

  const jobs = await getAllJobs();

  const recommendations = jobs
    .map((job) => {
      const scoringResult = scoreJob(candidate, job);

      return {
        job,
        ...scoringResult
      };
    })
    .filter((recommendation) => recommendation.eligible)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return recommendations;
};