const { pool } = require("../../models/db/connect");
const { isValidPassword } = require("../../utils/validation/passwordValidation");
const { comparePassword, hashPassword } = require('../authentication/func.js')
const updatePassword = async(req, res) => {
    const { userEmail } = req
    const { currentPassword, newPassword } = req.body;
    const errors = {};
    if (!currentPassword || !isValidPassword(currentPassword)) {
        errors.currentPassword = "Password must be at least 8 characters long and contain at least one letter and one number.";
    }
    if (!newPassword || !isValidPassword(newPassword)) {
        errors.newPassword = "Password must be at least 8 characters long and contain at least one letter and one number.";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(401).json(errors);
    }

    try {

        const comparePasswords = await comparePassword({ type: 'email', field: userEmail, plainPassword: currentPassword });

        if (!comparePasswords) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }
        const cipherPassword = await hashPassword(newPassword)

        await pool.query('UPDATE users SET password = ? WHERE email = ?', [cipherPassword, userEmail]);

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = updatePassword;