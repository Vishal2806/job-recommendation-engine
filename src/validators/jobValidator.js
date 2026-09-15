export const validateJob = (req, res, next) => {
  const {
    title,
    requiredSkills,
    minYearsExperience,
    location,
    salaryMin,
    salaryMax,
    remoteAllowed
  } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "Title is required and must be a string"
    });
  }

  if (
    !Array.isArray(requiredSkills) ||
    requiredSkills.length === 0
  ) {
    return res.status(400).json({
      message: "Required skills must be a non-empty array"
    });
  }

  const hasInvalidSkill = requiredSkills.some(
    (skill) =>
      !skill ||
      typeof skill.name !== "string" ||
      !["must-have", "nice-to-have"].includes(skill.type)
  );

  if (hasInvalidSkill) {
    return res.status(400).json({
      message:
        "Each required skill must have a valid name and type (must-have or nice-to-have)"
    });
  }

  if (
    typeof minYearsExperience !== "number" ||
    minYearsExperience < 0
  ) {
    return res.status(400).json({
      message:
        "Minimum years of experience must be a non-negative number"
    });
  }

  if (!location || typeof location !== "string") {
    return res.status(400).json({
      message: "Location is required and must be a string"
    });
  }

  if (
    typeof salaryMin !== "number" ||
    salaryMin < 0
  ) {
    return res.status(400).json({
      message: "Minimum salary must be a non-negative number"
    });
  }

  if (
    typeof salaryMax !== "number" ||
    salaryMax < 0
  ) {
    return res.status(400).json({
      message: "Maximum salary must be a non-negative number"
    });
  }

  if (salaryMax < salaryMin) {
    return res.status(400).json({
      message: "Maximum salary cannot be less than minimum salary"
    });
  }

  if (typeof remoteAllowed !== "boolean") {
    return res.status(400).json({
      message: "remoteAllowed must be a boolean"
    });
  }

  next();
};