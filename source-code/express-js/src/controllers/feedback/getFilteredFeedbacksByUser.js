const { pool } = require('../../models/db/connect.js');

const getFilteredFeedbacksByUser = async(req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID parameter is required.' });
        }

        const [result] = await pool.query('SELECT * FROM feedback WHERE memberId = ?', [userId]);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No feedback found for the specified user.' });
        }
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getFilteredFeedbacksByUser;