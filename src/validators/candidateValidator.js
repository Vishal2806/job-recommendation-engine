export const validateCandidate = (req, res, next) => {
  const {
    name,
    skills,
    yearsOfExperience,
    location,
    expectedSalary
  } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "Name is required and must be a string"
    });
  }

  if (
    !Array.isArray(skills) ||
    skills.length === 0 ||
    skills.some((skill) => typeof skill !== "string")
  ) {
    return res.status(400).json({
      message: "Skills must be a non-empty array of strings"
    });
  }

  if (
    typeof yearsOfExperience !== "number" ||
    yearsOfExperience < 0
  ) {
    return res.status(400).json({
      message: "Years of experience must be a non-negative number"
    });
  }

  if (!location || typeof location !== "string") {
    return res.status(400).json({
      message: "Location is required and must be a string"
    });
  }

  if (
    typeof expectedSalary !== "number" ||
    expectedSalary < 0
  ) {
    return res.status(400).json({
      message: "Expected salary must be a non-negative number"
    });
  }

  next();
};