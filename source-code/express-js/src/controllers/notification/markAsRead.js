const { pool } = require("../../models/db/connect");

async function markNotificationAsRead(req, res) {
    try {
        const { messageId } = req.params;
        let errors = {};
        if (!messageId) {
            errors.message = "No messageId provided.";
        }
        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        const sql = 'UPDATE notifications SET isRead = ? WHERE id = ?';
        const values = [true, messageId]; // Assuming 'isRead' is a boolean field

        // Execute the SQL query
        await pool.query(sql, values);
        console.log(`Notification with ID ${messageId} marked as read.`);
        return res.status(200).json({ success: true, message: 'Notification marked as read successfully.' });
    } catch (error) {
        console.error('Error marking notification as read:', error.message);
        return res.status(500).json({ success: false, error: 'Failed to mark notification as read.' });
    }
}

module.exports = markNotificationAsRead;