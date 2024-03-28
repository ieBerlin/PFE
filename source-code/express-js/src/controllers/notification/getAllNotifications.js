const { pool } = require("../../models/db/connect");

const getAllNotifications = async(req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: 'No user id provided!' });
        }

        const sql = 'SELECT * FROM notifications WHERE user_id = ?';
        const [result] = await pool.query(sql, [userId]);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No notifications found for the user' });
        }
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllNotifications;