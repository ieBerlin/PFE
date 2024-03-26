const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const updateFeedback = async(req, res) => {
    try {
        const { feedbackId } = req.params;
        const { memberId, feedbackType, feedbackMessage, ratings } = req.body;
        const errors = {};

        if (!feedbackId) {
            errors.feedbackId = "No provided feedback ID.";
        }
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

        const result = await pool.query(
            'UPDATE feedback SET memberId = ?, feedbackType = ?, feedbackDate = ?, feedbackMessage = ?, ratings = ? WHERE feedbackId = ?', [memberId, feedbackType, getCurrentDateTime(), feedbackMessage, ratings, feedbackId]
        );

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Feedback updated successfully' });
        } else {
            return res.status(404).json({ message: 'Feedback not found or no changes applied' });
        }
    } catch (error) {
        console.error('Error updating feedback:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateFeedback;