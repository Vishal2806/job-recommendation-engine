export const calculateExperienceScore = (
  candidateExperience,
  requiredExperience
) => {
  const maxScore = 20;

  if (requiredExperience <= 0) {
    return {
      score: maxScore,
      maxScore
    };
  }

  if (candidateExperience >= requiredExperience) {
    return {
      score: maxScore,
      maxScore
    };
  }

  const score =
    (candidateExperience / requiredExperience) * maxScore;

  return {
    score: Number(score.toFixed(2)),
    maxScore
  };
};