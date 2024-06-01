const { pool } = require("../../models/db/connect.js");
const { dateOfBirthFormatter } = require("../../utils/formatter/dateOfBirth.js");
const { phoneNumberFormatter } = require("../../utils/formatter/phoneNumber.js");
const {
    hashPassword,
    userExists,
    validateSignUpInputs,
} = require("./func.js");
const createUser = async(req, res) => {
    const {
        email,
        password,
        username,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        role,
        totalTrainedMembers,
        specialization,
        bio,
    } = req.body;
    const errors = validateSignUpInputs({
        email,
        password,
        username,
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        gender,
        address,
        role,
        totalTrainedMembers,
        specialization,
        bio,
    });
    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    try {
        if (await userExists(email, username)) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await hashPassword(password);
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
            role
        ];

        if (role === "coach") {
            let errors = {};
            if (totalTrainedMembers === undefined || totalTrainedMembers < 0) {
                errors.totalTrainedMembers = "Please provide a valid total trained members.";
            }
            if (!bio) {
                errors.bio = "Please provide a valid bio.";
            }
            if (Object.keys(errors).length) {
                return res.status(422).json(errors);
            }
        }

        const [result] = await pool.execute(sql, values);
        if (role === "coach") {
            await pool.query('INSERT INTO coaches (coachId, totalTrainedMembers, bio, specialization) VALUES (?, ?, ?, ?)', [result.insertId, totalTrainedMembers, bio, specialization]);
        }
        setTimeout(() => {
            return res.status(201).json({
                message: "User created successfully"

            });
        }, 2000);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = createUser;