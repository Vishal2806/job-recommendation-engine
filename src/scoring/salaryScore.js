export const calculateSalaryScore = (
  expectedSalary,
  salaryMin,
  salaryMax
) => {
  const maxScore = 15;

  // Job cannot meet the candidate's expectation.
  if (salaryMax < expectedSalary) {
    return {
      score: 0,
      maxScore,
      reason: "Job salary is below expected salary"
    };
  }

  // Expected salary is within the job's range.
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

  // Job range starts above candidate's expectation.
  if (salaryMin > expectedSalary) {
    return {
      score: maxScore,
      maxScore,
      reason: "Job salary is above expected salary"
    };
  }

  return {
    score: 0,
    maxScore,
    reason: "Salary mismatch"
  };
};