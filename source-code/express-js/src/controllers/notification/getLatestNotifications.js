const { pool } = require("../../models/db/connect");

const getLatestNotifications = async(req, res) => {
    try {
        const { userId } = req;
        if (!userId) {
            return res.status(400).json({ error: 'No user id provided!' });
        }

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const sql = 'SELECT * FROM notifications WHERE userId = ? AND created_at >= ?';
        const [result] = await pool.query(sql, [userId, sevenDaysAgo]);


        setTimeout(() => {
            return res.status(200).json(result);
        }, 1500);

    } catch (error) {
        console.error('Error retrieving notifications:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getLatestNotifications;