const { pool } = require("../../models/db/connect.js");

const enrollWithCoach = async(req, res) => {
    const { coachId } = req.params;
    const { userId: memberId } = req;

    try {
        const [existingEntries] = await pool.query(
            "SELECT COUNT(*) AS count FROM clients WHERE coach_id = '' AND member_id = ''"
        );

        const existingCount = existingEntries[0].count;

        if (existingCount > 0) {
            return res.status(200).json({ message: 'Already Exists' });
        } else {
            await pool.query(
                "INSERT INTO clients (coach_id, member_id) VALUES (?, ?)", [coachId, memberId]
            );
            return res.status(200).json({ message: 'New enrollment created' });
        }
    } catch (error) {
        console.error("Error enrolling with coach:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = enrollWithCoach;