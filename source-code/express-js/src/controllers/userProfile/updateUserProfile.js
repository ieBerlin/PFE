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
        const { userEmail } = req;
        const { email, username, firstName, lastName, dateOfBirth, phoneNumber, gender, address } = req.body;
        let errors = {};
        if (!email || !isValidEmail(email)) {
            errors.email = "Invalid email!";
        }

        if (!username || !isValidUsername(username)) {
            errors.username = "Invalid username";
        }
        if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
            errors.phone_number = "Invalid phone number!";
        }
        if (!dateOfBirth || !isValidAge(dateOfBirth)) {
            errors.date_of_birth = "Invalid date of birth!";
        }
        if (!firstName || !isValidName(firstName)) {
            errors.first_name = "Invalid first name!";
        }
        if (!lastName || !isValidName(lastName)) {
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
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [userEmail]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user profile in the database
        await pool.query('UPDATE users SET email=?, username=?, first_name=?, last_name=?, date_of_birth=?, phone_number=?, gender=?, address=? WHERE email=?', [email, username, firstName, lastName, dateOfBirth, phoneNumber, gender, address, email]);

        setTimeout(() => {
            return res.status(200).json({ message: 'User profile updated successfully.' });
        }, 1200);
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateUserProfile;