const { pool } = require("../../models/db/connect.js");

const deleteRequest = async(req, res) => {
    const { classId } = req.params;
    const { userId } = req;
    try {
        await pool.query(
            "DELETE FROM enrollmentrequests WHERE class_id = ? AND applicant_user_id = ?  ", [classId, userId]
        );

        return res.status(200).json({});
    } catch (error) {
        console.error("Error retrieving clients:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = deleteRequest;