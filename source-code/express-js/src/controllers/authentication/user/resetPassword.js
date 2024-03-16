const { pool } = require("../../../models/db/connect");
const bcrypt = require('bcrypt');

const resetPassword = async(req, res) => {
    const { email, resetToken, newPassword } = req.body;

    try {
        // Check if reset token is valid and retrieve the associated email
        const [result] = await pool.query('SELECT email FROM password_reset_requests WHERE resetToken = ?', [resetToken]);

        if (!result || !result[0]) {
            return res.status(400).json({
                message: "Invalid or expired reset token!"
            });
        }

        const storedEmail = result[0].email;

        // Check if provided email matches the email associated with the reset token
        if (email !== storedEmail) {
            return res.status(400).json({
                message: "Email does not match the one associated with the reset token!"
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database
        await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

        // Delete the reset token from the database
        await pool.query('DELETE FROM password_reset_requests WHERE resetToken = ?', [resetToken]);

        res.status(200).json({
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({
            message: 'Error resetting password'
        });
    }
};

module.exports = resetPassword;