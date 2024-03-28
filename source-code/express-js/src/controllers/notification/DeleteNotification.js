const { pool } = require("../../models/db/connect");

async function deleteNotification(req, res) {
    try {
        const { messageId } = req.params;
        let errors = {};
        if (!messageId) {
            errors.message = "No messageId provided.";
            return res.status(400).json(errors);
        }

        const sql = 'DELETE FROM notifications WHERE id = ?';
        const values = [messageId];

        // Execute the SQL query
        await pool.query(sql, values);

        console.log(`Notification with ID ${messageId} deleted.`);
        return res.status(200).json({ success: true, message: 'Notification deleted successfully.' });
    } catch (error) {
        console.error('Error deleting notification:', error.message);
        return res.status(500).json({ success: false, error: 'Failed to delete notification.' });
    }
}

module.exports = deleteNotification;