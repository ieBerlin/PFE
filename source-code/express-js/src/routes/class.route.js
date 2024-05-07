const express = require("express");
const router = express.Router();
const getAllClasses = require('../controllers/classController/getAllClasses.js');
const getSingleClass = require('../controllers/classController/getSingleClass.js');
const createClass = require('../controllers/classController/createClass.js');
const updateClass = require('../controllers/classController/updateClass.js');
const deleteClass = require('../controllers/classController/deleteClass.js');
const updateClassStatus = require('../controllers/classController/updateClassStatus.js');
const verifyToken = require("../middlewares/auth/authJWT.js");
const authAdminOrManager = require("../middlewares/auth/authAdminOrManager.js");
const authUserRole = require('../middlewares/auth/authUserRole.js');

router.get("/", verifyToken, getAllClasses);
router.get("/:classId", verifyToken, getSingleClass);
router.post("/", verifyToken, authAdminOrManager, createClass);
router.put("/:classId", verifyToken, updateClass);
router.delete("/:classId", verifyToken, authAdminOrManager, deleteClass);
router.put("/:classId/:status", verifyToken, authAdminOrManager, updateClassStatus);

module.exports = router;