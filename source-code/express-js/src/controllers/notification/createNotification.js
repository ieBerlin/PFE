const { pool } = require("../../models/db/connect");
const getCurrentDateTime = require("../../utils/getCurrentDateTime");

async function createNotification(req, res) {
    try {
        const { userId, title, message } = req.body;
        let errors = {};

        if (!userId) {
            errors.userId = "No provided userId.";
        }

        if (!title) {
            errors.title = "No provided title.";
        }

        if (!message) {
            errors.message = "No provided message.";
        }
        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }
        const sql = 'INSERT INTO notifications (userId,title,message) VALUES (?,?, ?)';
        const values = [userId, title, message];

        // Execute the SQL query
        await pool.query(sql, values);
        console.log(`Notification sent to user ${userId}: ${message}`);
        return res.status(201).json({ success: true, message: 'Notification created and sent successfully' });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        return res.status(500).json({ success: false, error: 'Failed to create notification' });
    }
}

module.exports = createNotification;