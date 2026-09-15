import pool from "../db/connection.js";

export const createCandidate = async (req, res) => {
  try {
    const {
      name,
      skills,
      yearsOfExperience,
      location,
      expectedSalary
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO candidates
      (name, skills, years_of_experience, location, expected_salary)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        name,
        JSON.stringify(skills),
        yearsOfExperience,
        location,
        expectedSalary
      ]
    );

    res.status(201).json({
      message: "Candidate created successfully",
      candidate: result.rows[0]
    });
  } catch (error) {
    console.error("Create candidate error:", error.message);

    res.status(500).json({
      message: "Failed to create candidate"
    });
  }
};