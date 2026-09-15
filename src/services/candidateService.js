import pool from "../db/connection.js";

export const getCandidateById = async (candidateId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM candidates
    WHERE id = $1
    `,
    [candidateId]
  );

  return result.rows[0];
};