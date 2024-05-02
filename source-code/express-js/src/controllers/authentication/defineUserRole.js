const jwt = require('jsonwebtoken');
const { fetchUserRole } = require("../../middlewares/auth/userRole");
const SECRET_KEY = require("../../config/jwt_secret");

const defineUserRole = async(req, res) => {
    const reqBody = req.body;
    const token = reqBody.token;

    if (!token) {
        return res.status(403).json({ error: "Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const email = decoded.email;

        const userRole = await fetchUserRole({ email });
        return res.status(200).json({ userRole });
    } catch (error) {
        console.error("An error occurred while fetching user role:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = defineUserRole;