const express = require("express");
const router = express.Router();
const getAllNotifications = require("../controllers/notification/getAllNotifications.js");
const getLatestNotifications = require("../controllers/notification/getLatestNotifications.js");
const createNotification = require("../controllers/notification/createNotification.js");
const authUserRole = require("../middlewares/auth/authUserRole.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const markNotificationAsRead = require("../controllers/notification/markAsRead.js");

router.get("/:userId", verifyToken, authUserRole, getAllNotifications);
router.get("/get-latest-notifications/:userId", verifyToken, authUserRole, getLatestNotifications);
router.post("/", verifyToken, authUserRole, createNotification);
router.post("/mark-as-read/:messageId", verifyToken, authUserRole, markNotificationAsRead);

module.exports = router;