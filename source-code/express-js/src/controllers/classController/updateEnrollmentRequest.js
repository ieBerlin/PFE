const { pool } = require("../../models/db/connect.js");

const updateEnrollmentRequestStatus = async(req, res) => {
    const { status } = req.body;
    const { requestId } = req.params;
    if (!['rejected', 'confirmed'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const [result] = await pool.query(
            "UPDATE EnrollmentRequests SET status = ? WHERE id = ?", [status, requestId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Request not found" });
        }

        return res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating enrollment request status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateEnrollmentRequestStatus;