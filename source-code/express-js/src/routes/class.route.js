const express = require("express");
const router = express.Router();
const getAllClasses = require('../controllers/classController/getAllClasses.js');
const getAllEnrollmentRequests = require('../controllers/classController/getAllEnrollmentRequests .js');
const getSingleClass = require('../controllers/classController/getSingleClass.js');
const createClass = require('../controllers/classController/createClass.js');
const updateClass = require('../controllers/classController/updateClass.js');
const updateEnrollmentRequest = require('../controllers/classController/updateEnrollmentRequest.js');
const createEnrollment = require('../controllers/classController/createEnrollment.js');
const deleteClass = require('../controllers/classController/deleteClass.js');
const updateClassStatus = require('../controllers/classController/updateClassStatus.js');
const verifyToken = require("../middlewares/auth/authJWT.js");
const authAdminOrManager = require("../middlewares/auth/authAdminOrManager.js");
const authUserRole = require('../middlewares/auth/authUserRole.js');

router.get("/", verifyToken, getAllClasses);
router.get("/enrollment-requests", verifyToken, getAllEnrollmentRequests);
router.get("/:classId", verifyToken, getSingleClass);
router.post("/", verifyToken, authAdminOrManager, createClass);
router.post("/enrollment-requests", verifyToken, createEnrollment);
router.put("/class-status/:requestId", verifyToken, updateEnrollmentRequest);
router.put("/:classId/:userId", verifyToken, updateClass);
router.delete("/:classId", verifyToken, deleteClass);
router.put("/:classId/:status", verifyToken, authAdminOrManager, updateClassStatus);

module.exports = router;