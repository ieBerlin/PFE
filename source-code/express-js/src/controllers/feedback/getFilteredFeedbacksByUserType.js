const { pool } = require('../../models/db/connect.js');

const getFilteredFeedbacksByUserType = async(req, res) => {
    try {
        const { userId, feedbackType } = req.query;

        if (!userId || !feedbackType) {
            return res.status(400).json({ message: 'User ID and feedback type parameters are required.' });
        }

        const [result] = await pool.query('SELECT * FROM feedback WHERE memberId = ? AND feedbackType = ?', [userId, feedbackType]);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No feedback found for the specified user and type.' });
        }
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getFilteredFeedbacksByUserType;