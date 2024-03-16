const { pool } = require('../../models/db/connect.js');

const updateFeedback = async(req, res) => {
    try {
        const feedbackId = parseInt(req.params.feedbackId);
        if (isNaN(feedbackId)) {
            return res.status(400).json({ message: 'Invalid feedbackId parameter' });
        }
        const { memberId, feedbackType, feedbackDate, comments, ratings } = req.body;
        const result = await pool.query(
            'UPDATE feedback SET memberId = ?, feedbackType = ?, feedbackDate = ?, comments = ?, ratings = ? WHERE feedbackId = ?', [memberId, feedbackType, feedbackDate, comments, ratings, feedbackId]
        );
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Feedback updated successfully' });
        } else {
            return res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        console.error('Error updating feedback:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateFeedback;