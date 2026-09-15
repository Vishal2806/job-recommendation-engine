export const calculateSalaryScore = (
  expectedSalary,
  salaryMin,
  salaryMax
) => {
  const maxScore = 15;

  // Candidate's expectation is within the job's salary range.
  if (
    expectedSalary >= salaryMin &&
    expectedSalary <= salaryMax
  ) {
    return {
      score: maxScore,
      maxScore,
      reason: "Expected salary is within job salary range"
    };
  }

  // Job offers more than the candidate expects.
  if (salaryMin > expectedSalary) {
    return {
      score: maxScore,
      maxScore,
      reason: "Job salary is above expected salary"
    };
  }

  // Job cannot fully meet the candidate's expectation.
  // Give a proportional score based on how close the
  // maximum offered salary is to the expectation.
  const score = Math.min(
    maxScore,
    (salaryMax / expectedSalary) * maxScore
  );

  return {
    score: Number(score.toFixed(2)),
    maxScore,
    reason: "Job salary partially meets expected salary"
  };
};