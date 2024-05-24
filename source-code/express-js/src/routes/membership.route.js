const express = require("express");
const router = express.Router();
const getMembershipStatus = require("../controllers/membershipPlan/getMembershipStatus.js");

const verifyToken = require("../middlewares/auth/authJWT.js");
router.get("/membership-status", verifyToken, getMembershipStatus);
module.exports = router;