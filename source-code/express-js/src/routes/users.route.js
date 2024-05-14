const express = require("express");
const router = express.Router();
const getAllUsersNum = require("../controllers/users/getAllUsersNum.js");
const getAllUsers = require("../controllers/users/getAllUsers.js");
const verifyToken = require("../middlewares/auth/authJWT.js");

router.get('/all-users-number', verifyToken, getAllUsersNum);
router.get('/all-users', verifyToken, getAllUsers);
module.exports = router;