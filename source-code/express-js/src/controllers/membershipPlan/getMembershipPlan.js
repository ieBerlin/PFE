const { pool } = require('../../models/db/connect.js');

const getMembershipPlan = async(req, res) => {
    try {
        // Validate planId parameter
        const planId = parseInt(req.params.planId);
        if (isNaN(planId)) {
            return res.status(400).json({ message: 'Invalid planId parameter' });
        }

        // Query the database to fetch the membership plan
        const [result] = await pool.query('SELECT * FROM membershipplans WHERE planId = ?', [planId]);

        // Check if a plan was found
        if (result.length > 0) {
            // Return the membership plan as JSON response
            return res.status(200).json(result[0]);
        } else {
            // If no plan found, return 404 Not Found
            return res.status(404).json({ message: 'Membership plan not found' });
        }
    } catch (error) {
        // Log the error
        console.error('Error retrieving membership plan:', error);
        // Return 500 Internal Server Error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getMembershipPlan;