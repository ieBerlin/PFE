const { pool } = require("../../models/db/connect");

/**
 * Retrieves user profile data from the database based on the provided email.
 * @param {Request} req The HTTP request object.
 * @param {Response} res The HTTP response object.
 */
const getUserProfileDependOnEmail = async(req, res) => {
    const userEmail = req.userEmail || undefined;
    if (!userEmail) {
        return res.status(403).json({
            message: 'Forbidden: Email not provided in request'
        });
    }

    try {
        // Fetch user profile data from the database
        const [result] = await pool.query('SELECT email,username,first_name,last_name,date_of_birth,phone_number,gender,address,role FROM users WHERE email = ?', [userEmail]);
        if (result.length > 0) {
            const userProfile = result[0]; // Extract user profile data
            setTimeout(() => {
                return res.status(200).json(userProfile);
            }, 1500);
        } else {
            return res.status(404).json({ message: 'User profile not found for the provided email' });
        }
    } catch (error) {
        console.error('Error retrieving user profile:', error.message); // Log specific error message
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getUserProfileDependOnEmail;