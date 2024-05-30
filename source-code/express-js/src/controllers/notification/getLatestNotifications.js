const { pool } = require("../../models/db/connect");

const getLatestNotifications = async(req, res) => {
    try {
        const { userId } = req;
        if (!userId) {
            return res.status(400).json({ error: 'No user id provided!' });
        }


        const sql = 'SELECT * FROM notifications WHERE userId = ? AND isRead = 0';
        const [result] = await pool.query(sql, [userId]);


        setTimeout(() => {
            return res.status(200).json(result);
        }, 500);

    } catch (error) {
        console.error('Error retrieving notifications:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getLatestNotifications;