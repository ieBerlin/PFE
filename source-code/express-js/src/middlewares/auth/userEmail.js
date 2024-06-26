const { pool } = require("../../models/db/connect");

/**
 * Fetches the email of a user based on their username from the database.
 * @param {string} username The username of the user to fetch the email for.
 * @returns {string|null} The email of the user, or null if not found.
 */
async function fetchUserEmail({ username }) {

    try {

        const [rows] = await pool.query('SELECT email FROM users WHERE username = ?', [username]);
        if (rows && rows.length > 0) {
            return rows[0].email;
        }
        throw { status: 404, message: "User not found" }
    } catch (error) {
        console.error("Error fetching user email:", error);
        throw error; // Throw error to be handled by the caller
    }
};

module.exports = {
    fetchUserEmail
};