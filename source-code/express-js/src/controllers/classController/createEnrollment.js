// Import necessary modules
const { pool } = require('../../models/db/connect.js');

// Define the createEnrollment function
const createEnrollment = async(req, res) => {
    try {
        const { class_id } = req.body;
        const { userId: applicant_user_id } = req;

        // Validate class_id presence
        if (!class_id) {
            return res.status(400).json({ error: "No class ID provided." });
        }

        // Check if the user is already enrolled in the class
        const [existingEnrollment] = await pool.query('SELECT * FROM enrollmentrequests WHERE class_id = ? AND applicant_user_id = ? AND status = "pending"', [class_id, applicant_user_id]);
        if (existingEnrollment.length > 0) {
            return res.status(401).json({ message: 'Already enrolled in this class.' });
        }

        // Insert new enrollment request
        await pool.query('INSERT INTO enrollmentrequests (applicant_user_id, class_id) VALUES (?, ?)', [applicant_user_id, class_id]);

        // Send success response
        return res.status(201).json({ 'already-enrolled-in': true });
    } catch (error) {
        console.error('Error creating enrollment request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = createEnrollment;