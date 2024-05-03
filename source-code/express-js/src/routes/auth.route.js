const express = require("express");
const router = express.Router();
const createUser = require("../controllers/authentication/signup.js");
const loginUser = require("../controllers/authentication/login.js");
const defineUserRole = require('../controllers/authentication/defineUserRole.js')
    // const sendResetEmail = require("../../controllers/authentication/sendResetEmail.js"); // Import sendResetEmail function
    // const resetPassword = require("../../controllers/authentication/resetPassword.js"); // Import resetPassword function
    // const verifyResetToken = require("../../controllers/authentication/verifyResetToken.js"); // Import verifyResetToken function
    // const updatePassword = require("../../controllers/authentication/updatePassword.js"); // Import updatePassword function
    // const resendVerificationEmail = require("../../controllers/authentication/resendVerificationEmail.js"); // Import resendVerificationEmail function

const verifyTokenMiddleware = require("../middlewares/auth/authJWT.js");
const verifyToken = require("../controllers/authentication/verifyToken.js");
router.route("/verify-token").get(verifyToken);
router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route('/user-role').post(defineUserRole)
    // router.route("/forget-password/send").post(sendResetEmail);
    // router.route("/reset-password").post(resetPassword);
    // router.route("/forget-password/verify-reset-token").post(verifyResetToken); // Corrected endpoint path
    // router.route("/update-password").post(updatePassword);
    // router.route("/resend-verification-email").post(resendVerificationEmail); // Use router.route instead of app.post

module.exports = router;