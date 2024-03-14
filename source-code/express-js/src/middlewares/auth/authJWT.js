const jwt = require('jsonwebtoken'); // Corrected require statement for jwt
const SECRET_KEY = require('../../config/jwt_secret.js');

function verifyToken(req, res, next) {
    console.log('token')
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Changed '|' to '||' for logical OR
    if (!token)
        return res.status(403).json({
            message: 'Forbidden'
        });
    token = token.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Corrected variable name and added missing 'const' keyword
        req.userId = decoded.id; // Corrected variable name from 'docded' to 'decoded'
        next(); // Added 'next()' to proceed to the next middleware
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized user!"
        });
    }
}

module.exports = verifyToken