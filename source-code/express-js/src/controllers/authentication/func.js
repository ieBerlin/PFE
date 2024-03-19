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
}) => {
    let errors = {};
    if (!email || !isValidEmail(email)) {
        errors.email = "Invalid email!";
    }
    if (!password || !isValidPassword(password)) {
        errors.password = "Invalid password!";
    }
    if (!username || !isValidUsername(username)) {
        errors.username = "Invalid username";
    }
    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
        errors.phoneNumber = "Invalid phone number!";
    }
    if (!dateOfBirth || !isValidAge(dateOfBirth)) {
        errors.dateOfBirth = "Invalid date of birth!";
    }
    if (!firstName || !isValidName(firstName)) {
        errors.firstName = "Invalid first name!";
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

const insertUser = async({
    email,
    hashedPassword,
    username,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    phoneNumber,
}) => {
    const formattedPhoneNumber = phoneNumberFormatter(phoneNumber);
    const formattedDateOfBirth = dateOfBirthFormatter(dateOfBirth);
    const sql = `
        INSERT INTO users (
            email,
            password,
            username,
            first_name,
            last_name,
            date_of_birth,
            gender,
            address,
            phone_number,
            role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,'registered-user')`;
    const values = [
        email,
        hashedPassword,
        username,
        firstName,
        lastName,
        formattedDateOfBirth,
        gender,
        address,
        formattedPhoneNumber,
    ];
    await pool.execute(sql, values);
};

module.exports = {
    insertUser,
    hashPassword,
    userExists,
    validateLoginInputs,
    validateSignUpInputs,
    comparePassword
};