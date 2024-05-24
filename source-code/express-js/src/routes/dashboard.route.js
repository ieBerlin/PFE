const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const calculateGrowth = require('../controllers/dashboardController/calculateGrowth .js');
const fetchTransactions = require('../controllers/dashboardController/fetchTransactions .js');

router.get("/", verifyToken, calculateGrowth);
router.get("/transactions", verifyToken, fetchTransactions);


module.exports = router;