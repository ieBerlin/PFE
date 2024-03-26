const jwt = require('jsonwebtoken'); // Corrected require statement for jwt
const SECRET_KEY = require('../../config/jwt_secret.js');
const { fetchUserEmail } = require('./userEmail.js');
const { fetchUserRole } = require('./userRole.js');

async function verifyToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Changed '|' to '||' for logical OR
    if (!token)
        return res.status(403).json({
            message: 'Forbidden'
        });
    token = token.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Corrected variable name and added missing 'const' keyword
        if (decoded.username) {
            decoded.email = await fetchUserEmail({ username: decoded.username });
        }
        req.userRole = await fetchUserRole({ email: decoded.email });
        req.userEmail = decoded.email;
        next();
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized user!"
        });
    }
}

module.exports = verifyToken