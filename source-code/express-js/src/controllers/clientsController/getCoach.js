const { pool } = require("../../models/db/connect.js");

const getCoachClients = async(req, res) => {
    const { coachId } = req.params;
    const { userId: memberId } = req;
    try {
        const [result] = await pool.query(
            "SELECT * FROM clients WHERE coach_id = ? AND member_id = ?  ", [coachId, memberId]
        );

        if (!result || result.length === 0) {
            return res.status(200).json({ status: 'send-request' });
        }

        const clientStatus = result[0].status
        if (clientStatus === "pending") {
            return res.status(200).json({ status: 'pending' });
        } else if (clientStatus === "contacted") {
            return res.status(200).json({ status: 'contacted' });
        } else {
            return res.status(200).json({ status: 'unknown' });
        }

    } catch (error) {
        console.error("Error retrieving clients:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getCoachClients;