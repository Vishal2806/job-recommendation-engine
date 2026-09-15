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