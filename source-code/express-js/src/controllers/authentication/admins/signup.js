const {
    hashPassword,
    insertAdmin,
    adminExists,
    validateSignUpInputs,
} = require("./func");
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../../config/jwt_secret.js')
const createAdmin = async(req, res) => {
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
    });

    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    try {
        if (await adminExists(email, username)) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await hashPassword(password);
        await insertAdmin({
            email,
            hashedPassword,
            username,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            address,
            phoneNumber,
        });
        const token = jwt.sign({
            username: username
        }, SECRET_KEY, {
            expiresIn: 200
        })
        return res.status(201).json({ username, token, message: "User created successfully" });
    } catch (error) {
        console.error("Error creating admin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = createAdmin;