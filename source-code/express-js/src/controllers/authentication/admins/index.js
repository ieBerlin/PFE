const {
    validateLoginInputs,
    hashPassword,
    insertAdmin,
    adminExists,
    validateSignUpInputs,
} = require("./func");

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
        phoneNumber
    });

    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    try {
        if (await adminExists(email)) {
            return res.status(409).json({ message: "Admin already exists" });
        }
        const hashedPassword = await hashPassword(password);

        await insertAdmin(email, hashedPassword);

        return res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        console.error("Error creating admin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginAdmin = async(req, res) => {};

module.exports = {
    createAdmin,
    loginAdmin,
};