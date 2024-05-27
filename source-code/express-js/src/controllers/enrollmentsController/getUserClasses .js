const { pool } = require("../../models/db/connect");

const getUserClasses = async (req, res) => {
  try {
    const { userId } = req;
    const sql = `
    SELECT 
    c.classId,
    c.startTime,
    c.startDate,
    er.status
  FROM enrollmentrequests er
  INNER JOIN classes c ON er.class_id = c.classId
  WHERE er.applicant_user_id = ? 
  AND (er.status = "pending" OR er.status = "confirmed")
`;
    const [results] = await pool.query(sql, [userId]);
    return res.status(200).json(results);
  } catch (error) {
    console.error("Error retrieving classes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getUserClasses;
