const {
    hashPassword,
    insertUser,
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
        if (await userExists(email, username)) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await hashPassword(password);
        await insertUser({
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
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = createUser;