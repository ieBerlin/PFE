const { pool } = require("../../models/db/connect.js");

const getMessages = async(req, res) => {
    try {
        const { userId } = req;
        const { personBiD } = req.params;
        let errors = {};

        if (!personBiD) {
            errors.otherPersonId = "Other person ID not provided";
        }
        if (Object.keys(errors).length) {
            return res.status(400).json({ errors });
        }

        const [resultAsCoach] = await pool.query(
            "SELECT * FROM messages WHERE coach_id = ? AND member_id = ? ORDER BY created_at ASC", [userId, personBiD]
        );

        const [resultAsMember] = await pool.query(
            "SELECT * FROM messages WHERE coach_id = ? AND member_id = ? ORDER BY created_at ASC", [personBiD, userId]
        );

        const results = [...resultAsCoach, ...resultAsMember];

        if (results.length === 0) {
            return res.status(200).json([]);
        }

        results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        return res.status(200).json(results);
    } catch (error) {
        console.error("Error retrieving messages:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getMessages;