import pool from "../db/connection.js";

export const getAllJobs = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM jobs
    ORDER BY id ASC
    `
  );

  return result.rows;
};
export const getJobById = async (jobId) => {
  const result = await pool.query(
    `
    SELECT *
    FROM jobs
    WHERE id = $1
    `,
    [jobId]
  );

  return result.rows[0];
};