const { pool } = require("../../models/db/connect.js");

const getAllUsersNum = async (req, res) => {
  let clubMembers, newCoaches, newMembers;

  // Set up parameters for the SQL queries
  const status = "active";
  const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const params = [status, last30Days];

  // SQL queries
  const sql = 'SELECT count(*) as count FROM users WHERE status = ?';
  const coachesSql = "SELECT count(*) as count FROM users WHERE status = ? AND registration_date >= ? AND role = 'coach'";
  const membersSql = "SELECT count(*) as count FROM users WHERE status = ? AND registration_date >= ? AND role = 'member'";

  try {
    // Execute SQL queries
    const [allUsersResult] = await pool.query(sql, [status]);
    const [coachesResult] = await pool.query(coachesSql, params);
    const [membersResult] = await pool.query(membersSql, params);

    // Extract counts from results
    clubMembers = allUsersResult[0].count;
    newCoaches = coachesResult[0].count;
    newMembers = membersResult[0].count;

    return res.status(200).json({ clubMembers, newCoaches, newMembers });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllUsersNum;
