export const calculateSkillScore = (candidateSkills, requiredSkills) => {
  const candidateSkillSet = new Set(
    candidateSkills.map((skill) => skill.toLowerCase())
  );

  const mustHaveSkills = requiredSkills.filter(
    (skill) => skill.type === "must-have"
  );

  const niceToHaveSkills = requiredSkills.filter(
    (skill) => skill.type === "nice-to-have"
  );

  const missingMustHave = mustHaveSkills.filter(
    (skill) => !candidateSkillSet.has(skill.name.toLowerCase())
  );

  if (missingMustHave.length > 0) {
    return {
      eligible: false,
      score: 0,
      maxScore: 50,
      matchedSkills: [],
      missingMustHave: missingMustHave.map((skill) => skill.name)
    };
  }

  const matchedMustHave = mustHaveSkills.filter(
    (skill) => candidateSkillSet.has(skill.name.toLowerCase())
  );

  const matchedNiceToHave = niceToHaveSkills.filter(
    (skill) => candidateSkillSet.has(skill.name.toLowerCase())
  );

  const totalRequiredSkills = requiredSkills.length;

  const matchedSkills =
    matchedMustHave.length + matchedNiceToHave.length;

  const score =
    totalRequiredSkills === 0
      ? 50
      : (matchedSkills / totalRequiredSkills) * 50;

  return {
    eligible: true,
    score: Number(score.toFixed(2)),
    maxScore: 50,
    matchedSkills: [
      ...matchedMustHave.map((skill) => skill.name),
      ...matchedNiceToHave.map((skill) => skill.name)
    ],
    missingMustHave: []
  };
};