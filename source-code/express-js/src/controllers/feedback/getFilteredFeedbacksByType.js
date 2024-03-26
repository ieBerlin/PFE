const { pool } = require('../../models/db/connect.js');

const getFilteredFeedbacksByType = async(req, res) => {
    try {
        const { feedbackType } = req.query;

        if (!feedbackType) {
            return res.status(400).json({ message: 'Feedback type parameter is required.' });
        }

        const [result] = await pool.query('SELECT * FROM feedback WHERE feedbackType = ?', [feedbackType]);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No feedback found for the specified type.' });
        }
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getFilteredFeedbacksByType;