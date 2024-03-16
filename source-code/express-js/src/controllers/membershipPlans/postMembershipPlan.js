const { pool } = require('../../models/db/connect.js');

const createMembershipPlan = async(req, res) => {
    try {
        // Extract necessary fields from request body
        const { planName, description, price, duration, features, availabilityStatus } = req.body;

        // Validate required fields
        if (!planName || !description || !price || !duration || !features || !availabilityStatus) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Insert the new membership plan into the database
        const result = await pool.query(
            'INSERT INTO membershipplans (planName, description, price, duration, features, availabilityStatus) VALUES (?, ?, ?, ?, ?, ?)', [planName, description, price, duration, features, availabilityStatus]
        );

        // Check if the plan was successfully inserted
        if (result.affectedRows > 0) {
            // Return the ID of the newly created plan
            return res.status(201).json({ message: 'Membership plan created successfully', planId: result.insertId });
        } else {
            // If the plan creation failed, return 500 Internal Server Error
            return res.status(500).json({ message: 'Failed to create membership plan' });
        }
    } catch (error) {
        // Log the error
        console.error('Error creating membership plan:', error);
        // Return 500 Internal Server Error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = createMembershipPlan;