const jwt = require("jsonwebtoken");
const secretKey = require("../../config/jwt_secret.js"); // Renamed variable
const { fetchUserEmail } = require("./userEmail.js");
const { fetchUserRole } = require("./userRole.js");
const { fetchUserId } = require("./fetchUserId.js");

async function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
  // token = token.split(".")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.username) {
      decoded.email = await fetchUserEmail({ username: decoded.username });
    }
    req.userRole = await fetchUserRole({ email: decoded.email });
    req.userId = await fetchUserId({ email: decoded.email });
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      message: "Unauthorized user!",
    });
  }
}

module.exports = verifyToken;
