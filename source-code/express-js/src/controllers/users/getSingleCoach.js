const { pool } = require("../../models/db/connect.js");

const getSingleCoach = async(req, res) => {
    try {
        const { coachId } = req.params;

        const [result] = await pool.query(
            "SELECT email, username, first_name, last_name, date_of_birth, phone_number, gender, address, role, registration_date, last_time_login, status FROM users WHERE userId = ?", [coachId]
        );

        if (result.length === 0) {
            return res.status(404).json({ message: "User profile not found." });
        }

        const [coachResult] = await pool.query(
            "SELECT specialization, experienceLevel, totalTrainedMembers, bio, contact FROM coaches WHERE coachId = ?", [coachId]
        );
        const [certificationResult] = await pool.query(
            "SELECT image , id  FROM certification WHERE coachId = ?", [coachId]
        );



        if (coachResult.length === 0) {
            return res.status(200).json(result[0]);
        }

        const coachData = {
            ...result[0],
            ...coachResult[0],
            certifications: certificationResult || []
        };

        return res.status(200).json(coachData);
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getSingleCoach;