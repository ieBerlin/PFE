const { pool } = require("../../models/db/connect.js");

const getAllEnrollmentRequests = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM EnrollmentRequests");

    const requestsWithUserInfo = await Promise.all(
      results.map(async (request) => {
        const [result] = await pool.query(
          "SELECT instructorId FROM classes WHERE classId = ?",
          [request.class_id]
        );
        return {
          ...request,
          instructorInformations: result[0],
        };
      })
    );
    return res.status(200).json(requestsWithUserInfo);
  } catch (error) {
    console.error("Error retrieving enrollment requests:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllEnrollmentRequests;
