const { pool } = require('../../models/db/connect.js');

const getAllUsersProfiles = async(req, res) => {
    try {
        // Fetch user profile data from the database
        const [result] = await pool.query('SELECT email, username, first_name, last_name, date_of_birth, phone_number, gender, address, role, registration_date, last_time_login FROM users');

        // Check if the user profile exists
        if (result.length > 0) {
            return res.status(200).json(result); // Return the user profile data
        } else {
            return res.status(404).json({ message: 'User profiles not found.' });
        }
    } catch (error) {
        console.error('Error retrieving user profiles:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllUsersProfiles;