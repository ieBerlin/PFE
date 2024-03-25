const express = require("express");
const router = express.Router();
const getAllBooking = require("../controllers/booking/getAllBooking.js");
const getSingleBooking = require("../controllers/booking/getSingleBooking.js");
const bookEquipment = require("../controllers/booking/bookEquipment.js");
const confirmEquipmentBooking = require("../controllers/booking/confirmEquipmentBooking.js");
const cancelEquipmentBooking = require("../controllers/booking/cancelEquipmentBooking.js");
const rejectEquipmentBooking = require("../controllers/booking/rejectEquipmentBooking.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authAdminOrManager = require("../middlewares/auth/authAdminOrManager.js");
const authUserRole = require('../middlewares/auth/authUserRole.js');

// Get single booking by ID
router.get("/:bookingId", authUserRole, getSingleBooking);

// Get all bookings (for admin or manager)
router.get("/", authAdminOrManager, getAllBooking);

// Book equipment
router.post("/", authUserRole, bookEquipment);

// Confirm equipment booking request (for admin or manager)
router.post("/confirm-request/:bookingId", verifyToken, authAdminOrManager, confirmEquipmentBooking);

// Cancel equipment booking request (for users)
router.post("/cancel-request/:bookingId", verifyToken, authUserRole, cancelEquipmentBooking);

// Reject equipment booking request (for admin or manager)
router.post("/reject-request/:bookingId", verifyToken, authAdminOrManager, rejectEquipmentBooking);

module.exports = router;