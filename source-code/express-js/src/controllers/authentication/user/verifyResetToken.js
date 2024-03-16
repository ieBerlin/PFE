const { pool } = require("../../../models/db/connect");

const verifyResetToken = async(req, res) => {
    const { resetToken } = req.params;

    try {
        // Check if reset token exists in the database
        const [result] = await pool.query('SELECT * FROM password_reset_requests WHERE resetToken = ?', [resetToken]);

        if (!result || !result[0]) {
            return res.status(400).json({
                message: "Invalid or expired reset token!"
            });
        }

        res.status(200).json({
            message: 'Reset token is valid'
        });
    } catch (error) {
        console.error('Error verifying reset token:', error);
        res.status(500).json({
            message: 'Error verifying reset token'
        });
    }
};

module.exports = verifyResetToken;