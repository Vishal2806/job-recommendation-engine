import { calculateSkillScore } from "./skillScore.js";
import { calculateExperienceScore } from "./experienceScore.js";
import { calculateLocationScore } from "./locationScore.js";
import { calculateSalaryScore } from "./salaryScore.js";

export const scoreJob = (candidate, job) => {
  const skillResult = calculateSkillScore(
    candidate.skills,
    job.required_skills
  );

  // Must-have skill failure means the job is not eligible.
  if (!skillResult.eligible) {
    return {
      eligible: false,
      score: 0,
      breakdown: {
        skills: `${skillResult.score}/${skillResult.maxScore}`,
        experience: "0/20",
        location: "0/15",
        salary: "0/15"
      },
      missingMustHave: skillResult.missingMustHave
    };
  }

  const experienceResult = calculateExperienceScore(
    Number(candidate.years_of_experience),
    Number(job.min_years_experience)
  );

  const locationResult = calculateLocationScore(
    candidate.location,
    job.location,
    job.remote_allowed
  );

  const salaryResult = calculateSalaryScore(
    candidate.expected_salary,
    job.salary_min,
    job.salary_max
  );

  const totalScore =
    skillResult.score +
    experienceResult.score +
    locationResult.score +
    salaryResult.score;

  return {
    eligible: true,
    score: Number(totalScore.toFixed(2)),
    breakdown: {
      skills: `${skillResult.score}/${skillResult.maxScore}`,
      experience: `${experienceResult.score}/${experienceResult.maxScore}`,
      location: `${locationResult.score}/${locationResult.maxScore}`,
      salary: `${salaryResult.score}/${salaryResult.maxScore}`
    },
    matchedSkills: skillResult.matchedSkills
  };
};