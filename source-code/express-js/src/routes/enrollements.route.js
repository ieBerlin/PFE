const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const getUserClasses = require("../controllers/enrollmentsController/getUserClasses .js");
router.get("/", verifyToken, getUserClasses);

module.exports = router;
