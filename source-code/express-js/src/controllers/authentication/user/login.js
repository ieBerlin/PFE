const { validateLoginInputs, userExists, comparePassword } = require("./func");
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../../config/jwt_secret.js')
const loginUser = async(req, res) => {
    const { email, password, username } = req.body;
    let errors = {};

    // Check if either email or username is provided
    if (!email && !username) {
        errors.login = "Please provide either email or username";
        return res.status(422).json(errors);
    }

    try {
        // If email is provided, validate email and password
        if (email) {
            errors = validateLoginInputs({ type: "email", field: email, password });
            if (Object.keys(errors).length > 0) {
                return res.status(422).json(errors);
            }
            if (!(await userExists(email, null))) {
                return res.status(404).json({ message: "User not found" });
            }
            const passwordMatch = await comparePassword({
                type: "email",
                plainPassword: password,
                field: email,
            });
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({
                    email
                }, SECRET_KEY, {
                    expiresIn: 2400
                })
                // Password matched, send success response
            return res.status(200).json({ token, message: "Login successful" });
        }

        // If username is provided, validate username and password
        else if (username) {
            errors = validateLoginInputs({
                type: "username",
                field: username,
                password,
            });
            if (Object.keys(errors).length > 0) {
                return res.status(422).json(errors);
            }
            // Implement similar logic as above for username

            if (!(await userExists(null, username))) {
                return res.status(404).json({ message: "User not found" });
            }
            const passwordMatch = await comparePassword({
                type: "username",
                plainPassword: password,
                field: username,
            });

            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({
                username: username
            }, SECRET_KEY, {
                expiresIn: 200
            })
            console.log("token :" + token)
                // Password matched, send success response
            return res.status(200).json({ token, message: "Login successful" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = loginUser;