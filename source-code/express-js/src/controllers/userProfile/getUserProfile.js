const { pool } = require('../../models/db/connect.js');

const getUserProfile = async(req, res) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is provided as a route parameter

        // Check if the user ID is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Fetch user profile data from the database
        const [result] = await pool.query('SELECT email, username, first_name, last_name, date_of_birth, phone_number, gender, address, role, registration_date, last_time_login FROM users WHERE userId = ?', [userId]);

        // Check if the user profile exists
        if (result.length > 0) {
            return res.status(200).json(result[0]); // Return the user profile data
        } else {
            return res.status(404).json({ message: 'User profile not found.' });
        }
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getUserProfile;