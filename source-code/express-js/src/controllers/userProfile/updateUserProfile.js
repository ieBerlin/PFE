const { pool } = require('../../models/db/connect.js');
const { isValidEmail } = require("../../utils/validation/emailValidation.js");
const {
    isValidPhoneNumber,
} = require("../../utils/validation/phoneNumberValidation.js");
const {
    isValidUsername,
} = require("../../utils/validation/usernameValidation.js");
const { isValidName } = require("../../utils/validation/nameValidation.js");
const { isValidAge } = require("../../utils/validation/ageValidation.js");
const updateUserProfile = async(req, res) => {
    try {
        const { userId } = req.params;
        const { email, username, first_name, last_name, date_of_birth, phone_number, gender, address } = req.body;
        let errors = {};
        if (!email || !isValidEmail(email)) {
            errors.email = "Invalid email!";
        }

        if (!username || !isValidUsername(username)) {
            errors.username = "Invalid username";
        }
        if (!phone_number || !isValidPhoneNumber(phone_number)) {
            errors.phone_number = "Invalid phone number!";
        }
        if (!date_of_birth || !isValidAge(date_of_birth)) {
            errors.date_of_birth = "Invalid date of birth!";
        }
        if (!first_name || !isValidName(first_name)) {
            errors.first_name = "Invalid first name!";
        }
        if (!last_name || !isValidName(last_name)) {
            errors.lastName = "Invalid last name!";
        }


        if (!address || address.trim() === "") {
            errors.address = "Invalid address!";
        }
        if (!gender || !isValidName(gender.trim())) {
            errors.gender = "Invalid gender!";
        }
        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        // Check if the user exists
        const [user] = await pool.query('SELECT * FROM users WHERE userId = ?', [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user profile in the database
        await pool.query('UPDATE users SET email=?, username=?, first_name=?, last_name=?, date_of_birth=?, phone_number=?, gender=?, address=? WHERE userId=?', [email, username, first_name, last_name, date_of_birth, phone_number, gender, address, userId]);

        return res.status(200).json({ message: 'User profile updated successfully.' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateUserProfile;