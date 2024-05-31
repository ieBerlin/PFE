const express = require("express");
const router = express.Router();
const getAllBooking = require("../controllers/booking/getAllBooking.js");
const getSingleBooking = require("../controllers/booking/getSingleBooking.js");
const getUserEquipments = require("../controllers/booking/getUserEquipments.js");
const bookEquipment = require("../controllers/booking/bookEquipment.js");
const updateBooking = require("../controllers/booking/updateBooking.js");
const confirmEquipmentBooking = require("../controllers/booking/confirmEquipmentBooking.js");
const cancelEquipmentBooking = require("../controllers/booking/cancelEquipmentBooking.js");
const rejectEquipmentBooking = require("../controllers/booking/rejectEquipmentBooking.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authAdminOrManager = require("../middlewares/auth/authAdminOrManager.js");
const authUserRole = require('../middlewares/auth/authUserRole.js');
const createNotification = require("../controllers/notification/createNotification.js");

router.get("/getUserEquipments", verifyToken, getUserEquipments);
router.get("/", verifyToken, getAllBooking);
router.get("/:bookingId", verifyToken, getSingleBooking);
router.post("/", verifyToken, bookEquipment);
router.put("/:bookingId", verifyToken, updateBooking, createNotification);
// Get single booking by ID

// // Get all bookings (for admin or manager)
// router.get("/", authAdminOrManager, getAllBooking);

// Book equipment

// // Confirm equipment booking request (for admin or manager)
// router.post("/confirm-request/:bookingId", verifyToken, authAdminOrManager, confirmEquipmentBooking);

// // Cancel equipment booking request (for users)
// router.post("/cancel-request/:bookingId", verifyToken, authUserRole, cancelEquipmentBooking);

// // Reject equipment booking request (for admin or manager)
// router.post("/reject-request/:bookingId", verifyToken, authAdminOrManager, rejectEquipmentBooking);

module.exports = router;