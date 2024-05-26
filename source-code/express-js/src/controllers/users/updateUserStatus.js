const { pool } = require('../../models/db/connect.js');

const updateUserStatus = async(req, res) => {
    try {
        const userId = req.params.userId;
        const { status } = req.body;
        console.log(status);
        console.log(userId);
        // Validate the new status
        if (status !== 'active' && status !== 'blocked') {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const [result] = await pool.query('UPDATE users SET status = ? WHERE userId = ?', [status, userId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'User status updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateUserStatus;