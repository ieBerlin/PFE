const { pool } = require("../../models/db/connect.js");

const deleteRequest = async (req, res) => {
  const { coachId } = req.params;
  const { userId: memberId } = req;
  try {
    await pool.query(
      "DELETE FROM clients WHERE coach_id = ? AND member_id = ?  ",
      [coachId, memberId]
    );

    return res.status(200).json({});
  } catch (error) {
    console.error("Error retrieving clients:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteRequest;
