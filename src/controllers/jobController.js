import pool from "../db/connection.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      requiredSkills,
      minYearsExperience,
      location,
      salaryMin,
      salaryMax,
      remoteAllowed
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO jobs
      (
        title,
        required_skills,
        min_years_experience,
        location,
        salary_min,
        salary_max,
        remote_allowed
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        title,
        JSON.stringify(requiredSkills),
        minYearsExperience,
        location,
        salaryMin,
        salaryMax,
        remoteAllowed
      ]
    );

    res.status(201).json({
      message: "Job created successfully",
      job: result.rows[0]
    });
  } catch (error) {
    console.error("Create job error:", error.message);

    res.status(500).json({
      message: "Failed to create job"
    });
  }
};