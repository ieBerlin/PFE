const { pool } = require('../../models/db/connect.js');

const getMembershipPlans = async(req, res) => {
    try {
        // Query the database to fetch all membership plans
        const [result] = await pool.query('SELECT * FROM membershipplans');

        // Check if any plans were found
        if (result.length > 0) {
            // Return the membership plans as JSON response
            return res.status(200).json(result);
        } else {
            // If no plans found, return 404 Not Found
            return res.status(404).json({ message: 'No membership plans found' });
        }
    } catch (error) {
        // Log the error
        console.error('Error retrieving membership plans:', error);
        // Return 500 Internal Server Error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getMembershipPlans;