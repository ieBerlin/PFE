const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const createFeedback = async(req, res) => {
    try {
        const { memberId, feedbackType, feedbackMessage, ratings } = req.body;
        const errors = {};

        if (!memberId) {
            errors.memberId = "No provided member ID.";
        }
        if (!feedbackType) {
            errors.feedbackType = "No provided feedback type.";
        }
        if (!ratings) {
            errors.ratings = "No provided ratings.";
        }

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        const [result] = await pool.query(
            'INSERT INTO feedback (memberId, feedbackType, feedbackDate, feedbackMessage, ratings) VALUES (?, ?, ?, ?, ?)', [memberId, feedbackType, getCurrentDateTime(), feedbackMessage, ratings]
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