const express = require("express");
const router = express.Router();
const createUser = require("../../../controllers/authentication/user/signup.js");
const loginUser = require("../../../controllers/authentication/user/login.js");
const verifyToken = require("../../../middlewares/auth/authJWT.js");

// router.route("/signup").post(createUser);
router.route("/login").post(loginUser);

//temporary router :
router.get("/dashboard", verifyToken, (req, res) => {
    res.send("Successfully accessed dashboard");
  });

module.exports = router;
