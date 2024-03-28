const { pool } = require("../../models/db/connect");

async function getSingleNotification(req, res) {
    try {
        const { messageId } = req.params;
        let errors = {};
        if (!messageId) {
            errors.message = "No messageId provided.";
            return res.status(400).json(errors);
        }

        const sql = 'SELECT * FROM notifications WHERE id = ?';
        const values = [messageId];

        // Execute the SQL query
        const result = await pool.query(sql, values);

        if (result.length === 0) {
            return res.status(404).json({ success: false, error: 'Notification not found.' });
        }

        const notification = result[0];
        return res.status(200).json({ success: true, notification });
    } catch (error) {
        console.error('Error fetching notification:', error.message);
        return res.status(500).json({ success: false, error: 'Failed to fetch notification.' });
    }
}

module.exports = getSingleNotification;