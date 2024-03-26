const { pool } = require('../../models/db/connect.js');

const updateClassStatus = async(req, res) => {
    try {
        const { classId, status } = req.params;

        if (!classId || !status) {
            return res.status(400).json({ message: "ClassId and status are required." });
        }

        const sql = "UPDATE classes SET status = ? WHERE classId = ?";
        const [result] = await pool.query(sql, [status, classId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: `Class status updated to ${status} successfully` });
        } else {
            return res.status(404).json({ message: "Class not found" });
        }
    } catch (error) {
        console.error("Error updating class status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateClassStatus;