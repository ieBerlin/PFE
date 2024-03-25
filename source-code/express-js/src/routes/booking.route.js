const express = require("express");
const router = express.Router();
// const getBooking = require("../controllers/booking/getBooking.js");
// const getSingleBooking = require("../controllers/booking/getSingleBooking.js");
const createBooking = require("../controllers/booking/createBooking.js");
// const updateBooking = require("../controllers/booking/updateBooking.js");
// const deleteBooking = require("../controllers/booking/deleteBooking.js");
// const verifyToken = require("../middlewares/auth/authJWT.js");
// const authAdmin = require("../middlewares/auth/authAdmin.js");

// router.get("/", getBooking);
// router.get("/:bookingId", getSingleBooking);
router.post("/", createBooking);
// router.put("/:bookingId", verifyToken, authAdmin, updateBooking);
// router.delete("/:bookingId", verifyToken, authAdmin, deleteBooking);

module.exports = router;