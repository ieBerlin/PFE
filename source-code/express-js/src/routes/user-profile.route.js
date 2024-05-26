const express = require("express");
const router = express.Router();
const getUserProfile = require("../controllers/userProfile/getUserProfile.js");
const getAllUsersProfiles = require("../controllers/userProfile/getAllUsersProfiles.js");
const updateUserProfile = require("../controllers/userProfile/updateUserProfile.js");
const deleteUserProfile = require("../controllers/userProfile/deleteUserProfile.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authUserRole = require('../middlewares/auth/authUserRole.js')
const authAdminOrManager = require('../middlewares/auth/authAdminOrManager.js')
const getUserProfileDependOnEmail = require('../controllers/userProfile/getUserProfileDependOnEmail.js')
const updatePassword = require('../controllers/userProfile/updatePassword.js')

router.get("/", verifyToken, getUserProfileDependOnEmail)
router.get("/all-users", verifyToken, getAllUsersProfiles);
router.get("/:userId", verifyToken, getUserProfile);
router.put("/", verifyToken, updateUserProfile)
router.post('/update-password', verifyToken, updatePassword)
router.delete("/:userId", verifyToken, deleteUserProfile);
module.exports = router;