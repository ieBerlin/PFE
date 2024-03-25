const express = require("express");
const router = express.Router();
// const getBooking = require("../controllers/booking/getBooking.js");
const getSingleBooking = require("../controllers/booking/getSingleBooking.js");
const bookEquipment = require("../controllers/booking/bookEquipment.js");
const modifyEquipmentBooking = require("../controllers/booking/modifyEquipmentBooking.js");
const confirmEquipmentBooking = require("../controllers/booking/confirmEquipmentBooking.js");
// const deleteBooking = require("../controllers/booking/deleteBooking.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authAdminOrManager = require("../middlewares/auth/authAdminOrManager.js");

// router.get("/", getBooking);
router.get("/:bookingId", getSingleBooking);
router.post("/", bookEquipment);
router.post("/confirm-request/:bookingId", verifyToken, authAdminOrManager, confirmEquipmentBooking);
// router.put("/:bookingId", verifyToken, authAdmin, updateBooking);
// router.delete("/:bookingId", verifyToken, authAdmin, deleteBooking);

module.exports = router;