const { pool } = require('../../models/db/connect.js');

const getSingleFeedback = async(req, res) => {
    try {
        const feedbackId = parseInt(req.params.feedbackId);
        if (isNaN(feedbackId)) {
            return res.status(400).json({ message: 'Invalid feedbackId parameter' });
        }
        const [result] = await pool.query('SELECT * FROM feedback WHERE feedbackId = ?', [feedbackId]);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getSingleFeedback;