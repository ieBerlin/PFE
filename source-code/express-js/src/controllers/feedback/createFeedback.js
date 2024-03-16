const { pool } = require('../../models/db/connect.js');

const createFeedback = async(req, res) => {
    try {
        const { memberId, feedbackType, feedbackDate, comments, ratings } = req.body;
        if (!memberId || !feedbackType || !feedbackDate) {
            return res.status(400).json({ message: 'Member ID, feedback type, and feedback date are required' });
        }
        const result = await pool.query(
            'INSERT INTO feedback (memberId, feedbackType, feedbackDate, comments, ratings) VALUES (?, ?, ?, ?, ?)', [memberId, feedbackType, feedbackDate, comments, ratings]
        );
        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Feedback created successfully', feedbackId: result.insertId });
        } else {
            return res.status(500).json({ message: 'Failed to create feedback' });
        }
    } catch (error) {
        console.error('Error creating feedback:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = createFeedback;