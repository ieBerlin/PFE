const { pool } = require("../../models/db/connect");

async function markNotificationAsRead(req, res) {
    try {
        const { userId } = req;
        const sql = 'UPDATE notifications SET isRead = ? WHERE userId = ? ';
        const values = [true, userId];
        await pool.query(sql, values);

        return res.status(200).json({ success: true, message: 'Notification marked as read successfully.' });
    } catch (error) {
        console.error('Error marking notification as read:', error.message);
        return res.status(500).json({ success: false, error: 'Failed to mark notification as read.' });
    }
}

module.exports = markNotificationAsRead;