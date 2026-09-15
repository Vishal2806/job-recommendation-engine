export const calculateLocationScore = (
  candidateLocation,
  jobLocation,
  remoteAllowed
) => {
  const maxScore = 15;

  if (
    candidateLocation.toLowerCase() ===
    jobLocation.toLowerCase()
  ) {
    return {
      score: maxScore,
      maxScore,
      reason: "Exact location match"
    };
  }

  if (remoteAllowed) {
    return {
      score: 10,
      maxScore,
      reason: "Remote work allowed"
    };
  }

  return {
    score: 0,
    maxScore,
    reason: "Location mismatch"
  };
};