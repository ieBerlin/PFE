const { isValidEmail } = require("../../../utils/validation/emailValidation");
const { isValidPhoneNumber } = require("../../../utils/validation/phoneNumberValidation.js");
const { isValidUsername } = require("../../../utils/validation/usernameValidation.js");
const { isValidName } = require("../../../utils/validation/nameValidation.js");
const { isValidAge } = require("../../../utils/validation/ageValidation.js");
const {
    isValidPassword,
} = require("../../../utils/validation/passwordValidation");
const { pool } = require("../../../models/db/connect.js");
const bcrypt = require("bcrypt");
const validateSignUpInputs = ({
    email,
    password,
    username,
    firstName,
    lastName,
    dateOfBirth,
    phoneNumber,
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
        errors.age = "Invalid age!";
    }
    if (!firstName || !isValidName(firstName)) {
        errors.firstName = "Invalid first name!";
    }
    if (!lastName || !isValidName(lastName)) {
        errors.lastName = "Invalid last name!";
    }
    return errors;
}
const validateLoginInputs = (email, password) => {
    const errors = {};
    if (!email || !isValidEmail(email)) {
        errors.email = "Invalid email!";
    }
    if (!password || !isValidPassword(password)) {
        errors.password = "Invalid password!";
    }
    return errors;
};

const adminExists = async(email) => {
    const [existingAdmin] = await pool.query(
        "SELECT * FROM admin WHERE email = ?", [email]
    );
    return existingAdmin.length > 0;
};

const hashPassword = async(password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const insertAdmin = async(email, hashedPassword) => {
    const sql = "INSERT INTO admin (email, password) VALUES (?, ?)";
    const values = [email, hashedPassword];
    await pool.execute(sql, values);
};
module.exports = {
    insertAdmin,
    hashPassword,
    adminExists,
    validateLoginInputs,
    validateSignUpInputs
}