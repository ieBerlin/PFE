const { pool } = require("../../../models/db/connect");
const { isValidEmail } = require("../../../utils/validation/emailValidation");

const forgetPassword = async(req, res) => {

    const { email, token } = req.query;
    if (!email || !isValidEmail(email) || !token) {
        return res.status(400).json({
            message: 'Invalid token or email'
        });
    }

    try {
        const [result] = await pool.query('SELECT * FROM password_reset_requests WHERE email = ? AND resetToken = ?', [email, token]);
        if (result && result.length > 0) {
            return res.status(200).json({
                message: "Password reset request found"
            });
        } else {
            return res.status(404).json({
                message: "Password reset request not found"
            });
        }
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = forgetPassword;