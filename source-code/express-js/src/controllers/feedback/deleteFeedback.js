const { pool } = require('../../models/db/connect.js');

const deleteFeedback = async(req, res) => {
    try {
        const feedbackId = parseInt(req.params.feedbackId);
        if (isNaN(feedbackId)) {
            return res.status(400).json({ message: 'Invalid feedbackId parameter' });
        }
        const result = await pool.query('DELETE FROM feedback WHERE feedbackId = ?', [feedbackId]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Feedback deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        console.error('Error deleting feedback:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = deleteFeedback;