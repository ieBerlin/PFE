const { isValidEmail } = require("../../utils/validation/emailValidation.js");
const {
    isValidPhoneNumber,
} = require("../../utils/validation/phoneNumberValidation.js");
const {
    isValidUsername,
} = require("../../utils/validation/usernameValidation.js");
const { isValidName } = require("../../utils/validation/nameValidation.js");
const { isValidAge } = require("../../utils/validation/ageValidation.js");
const {
    isValidPassword,
} = require("../../utils/validation/passwordValidation.js");
const {
    dateOfBirthFormatter,
} = require("../../utils/formatter/dateOfBirth.js");
const {
    phoneNumberFormatter,
} = require("../../utils/formatter/phoneNumber.js");
const { pool } = require("../../models/db/connect.js");

const bcrypt = require("bcrypt");
const validateSignUpInputs = ({
    email,
    password,
    username,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
    gender,
    address,
    role
}) => {
    let errors = {};

    if (!email || !isValidEmail(email)) {
        errors.email = "Please provide a valid email address.";
    }

    if (!password || !isValidPassword(password)) {
        errors.password = "Password must be at least 8 characters long and contain at least one letter and one number.";
    }

    if (!username || !isValidUsername(username)) {
        errors.username = "Please provide a valid username.";
    }

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
        errors.phoneNumber = "Please provide a valid phone number.";
    }

    if (!dateOfBirth || !isValidAge(dateOfBirth)) {
        errors.dateOfBirth = "Please provide a valid date of birth.";
    }

    if (!firstName || !isValidName(firstName)) {
        errors.firstName = "Please provide a valid first name.";
    }

    if (!lastName || !isValidName(lastName)) {
        errors.lastName = "Please provide a valid last name.";
    }

    if (!address || address.trim() === "") {
        errors.address = "Please provide a valid address.";
    }

    if (!gender || !isValidName(gender.trim())) {
        errors.gender = "Please provide a valid gender.";
    }

    if (!role || (role.toLowerCase() !== 'member' && role.toLowerCase() !== 'coach' && role.toLowerCase() !== 'admin')) {
        errors.role = "Please select a valid role (Member or Coach).";
    }

    return errors;
};

const validateLoginInputs = ({ type, field, password }) => {
    const errors = {};
    if (type === "email") {
        if (!field || !isValidEmail(field)) {
            errors.email = "Invalid email!";
        }
    } else {
        if (!field || !isValidUsername(field)) {
            errors.username = "Invalid username!";
        }
    }
    if (!password || !isValidPassword(password)) {
        errors.password = "Invalid password!";
    }
    return errors;
};

const userExists = async(email, username) => {
    const [existingUser] = await pool.query(
        "SELECT * FROM users WHERE email = ? OR username = ?", [email, username]
    );
    return existingUser.length > 0;
};
const checkUserStatus = async(email, username) => {
    const [result] = await pool.query(
        "SELECT COUNT(*) AS count FROM users WHERE (email = ? OR username = ?) AND status = 'blocked'", [email, username]
    );
    return result[0].count;
};


const hashPassword = async(password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
const comparePassword = async({ type, field, plainPassword }) => {
    try {
        let result;
        if (type === 'email') {
            result = await pool.query('SELECT password FROM users WHERE email = ? LIMIT 1', [field]);
        } else {
            result = await pool.query('SELECT password FROM users WHERE username = ? LIMIT 1', [field]);
        }
        if (!result[0] || !result[0][0] || !result[0][0].password) {
            return false;
        }
        const hashedPasswordFromDB = result[0][0].password;
        const match = await bcrypt.compare(plainPassword, hashedPasswordFromDB);
        return match;
    } catch (error) {
        throw new Error('Invalid credentials!');
    }
};


module.exports = {
    hashPassword,
    userExists,
    validateLoginInputs,
    validateSignUpInputs,
    comparePassword,
    checkUserStatus
};