const { pool } = require("../../models/db/connect.js");

const getUserCoaches = async(req, res) => {
    try {
        const { userId } = req;

        const [result] = await pool.query(
            "SELECT coach_id FROM clients WHERE member_id = ?", [userId]
        );

        if (result.length === 0) {
            return res.status(200).json([]);
        }

        const coachDetails = [];

        for (let i = 0; i < result.length; i++) {
            const [coachInfo] = await pool.query(
                "SELECT userId, CONCAT(first_name,' ',last_name) AS name,image FROM users WHERE userId = ?", [result[i].coach_id]
            );
            if (coachInfo.length > 0) {
                coachDetails.push(coachInfo[0]);
            }
        }

        return res.status(200).json(coachDetails);
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getUserCoaches;