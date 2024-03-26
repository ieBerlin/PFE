const { pool } = require("../../models/db/connect");

/**
 * Fetches the role of a user based on their username from the database.
 * @param {string} username The username of the user to fetch the role for.
 * @returns {string|null} The role of the user, or null if not found.
 */
const fetchUserRole = async({ email }) => {
    try {
        const [rows] = await pool.query('SELECT role FROM users WHERE email = ?', [email]);
        if (rows && rows.length > 0) {
            return rows[0].role;
        } else {
            return null; // Return null if user with the provided username is not found
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        throw error; // Throw error to be handled by the caller
    }
};

module.exports = {
    fetchUserRole
};