const { pool } = require("../../models/db/connect");

const getAllNotifications = async(req, res) => {
    try {
        const { userEmail } = req
        if (!userEmail) {
            return res.status(400).json({ error: 'No user email provided!' });
        }


        const sql = 'SELECT * FROM notifications WHERE userEmail = ?';
        const [result] = await pool.query(sql, [userEmail]);

        if (result.length > 0) {
            setTimeout(() => {
                return res.status(200).json(result);
            }, 1000);
        } else {
            return res.status(404).json({ message: 'No notifications found for the user' });
        }
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllNotifications;