const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const getUserClasses = require("../controllers/enrollmentsController/getUserClasses.js");
const deleteRequest = require("../controllers/enrollmentsController/deleteRequest.js");
router.get("/", verifyToken, getUserClasses);
router.delete('/:classId', verifyToken, deleteRequest)
module.exports = router;