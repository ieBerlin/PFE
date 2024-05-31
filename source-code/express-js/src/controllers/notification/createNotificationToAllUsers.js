const { pool } = require("../../models/db/connect");

async function createNotificationToAllUsers(req, res) {
    try {
        const { title, message } = req.body;
        let errors = {};

        if (!title) {
            errors.title = "No provided title.";
        }

        if (!message) {
            errors.message = "No provided message.";
        }

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        // Fetch all user IDs where status is 'confirmed' and role is not 'admin'
        const usersQuery = 'SELECT userId FROM users WHERE status = ? AND role != ?';
        const usersValues = ['active', 'admin'];
        const [result] = await pool.query(usersQuery, usersValues);

        if (result.length === 0) {
            return res.status(404).json({ success: false, error: 'No users found to notify' });
        }

        // Insert notification for each user
        const insertQuery = 'INSERT INTO notifications (userId, title, message) VALUES ?';
        const notificationValues = result.map(user => [user.id, title, message]);

        await pool.query(insertQuery, [notificationValues]);

        console.log(`Notification sent to all confirmed users who are not admins.`);
        return res.status(201).json({ success: true, message: 'Notification created and sent successfully' });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        return res.status(500).json({ success: false, error: 'Failed to create notification' });
    }
}

module.exports = createNotificationToAllUsers;