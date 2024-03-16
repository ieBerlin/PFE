const express = require("express");
const router = express.Router();
const createUser = require("../../../controllers/authentication/user/signup.js");
const loginUser = require("../../../controllers/authentication/user/login.js");
const sendResetEmail = require("../../../controllers/authentication/user/sendResetEmail.js"); // Import sendResetEmail function
const resetPassword = require("../../../controllers/authentication/user/resetPassword.js"); // Import resetPassword function
const verifyResetToken = require("../../../controllers/authentication/user/verifyResetToken.js"); // Import verifyResetToken function
const updatePassword = require("../../../controllers/authentication/user/updatePassword.js"); // Import updatePassword function
const resendVerificationEmail = require("../../../controllers/authentication/user/resendVerificationEmail.js"); // Import resendVerificationEmail function
const verifyToken = require("../../../middlewares/auth/authJWT.js");

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
// router.route("/forget-password/send").post(sendResetEmail);
// router.route("/reset-password").post(resetPassword);
// router.route("/forget-password/verify-reset-token").post(verifyResetToken); // Corrected endpoint path
// router.route("/update-password").post(updatePassword);
// router.route("/resend-verification-email").post(resendVerificationEmail); // Use router.route instead of app.post

// Temporary router for dashboard
router.get("/dashboard", verifyToken, (req, res) => {
    res.send("Successfully accessed dashboard");
});

module.exports = router;