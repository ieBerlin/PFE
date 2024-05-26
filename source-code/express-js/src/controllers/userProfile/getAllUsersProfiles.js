const { pool } = require("../../models/db/connect.js");

const getAllUsersProfiles = async(req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT userId, email, username, first_name, last_name, date_of_birth, phone_number, gender, address, role, registration_date, last_time_login, status FROM users"
        );
        setTimeout(() => {
            return res.status(200).json(result); // Return the user profile data
        }, 750);
    } catch (error) {
        console.error("Error retrieving user profiles:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getAllUsersProfiles;