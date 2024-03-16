const { pool } = require("../../../models/db/connect");
const bcrypt = require('bcrypt');

const updatePassword = async(req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database
        await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

        res.status(200).json({
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({
            message: 'Error updating password'
        });
    }
};

module.exports = updatePassword;