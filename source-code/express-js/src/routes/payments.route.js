const express = require("express");
const verifyToken = require("../middlewares/auth/authJWT");
const getAllPayments = require('../controllers/payments/getAllPayments.js')
const getLastSevenDaysPayments = require('../controllers/payments/getLastSevenDaysPayments.js')
const router = express.Router();
router.get("/", verifyToken, getAllPayments);
router.get("/last-7-payments", verifyToken, getLastSevenDaysPayments);

module.exports = router;