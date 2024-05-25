const { pool } = require("../../models/db/connect");

/**
 * Fetches the email of a user based on their username from the database.
 * @param {string} username The username of the user to fetch the email for.
 * @returns {string|null} The email of the user, or null if not found.
 */
const fetchUserId = async({ email }) => {

    try {

        const [rows] = await pool.query('SELECT userId FROM users WHERE email = ?', [email]);
        if (rows && rows.length > 0) {
            return rows[0].userId;
        }
        throw { status: 404, message: "User not found" }
    } catch (error) {
        console.error("Error fetching user userId:", error);
        throw error; // Throw error to be handled by the caller
    }
};

module.exports = {
    fetchUserId
};