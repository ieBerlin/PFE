const express = require("express");
const router = express.Router();
const getMembershipStatus = require("../controllers/membershipPlan/getMembershipStatus.js");
const getUsershipStatus = require("../controllers/membershipPlan/getUsershipStatus.js");
const rechargerUserMembership = require("../controllers/membershipPlan/rechargerUserMembership.js");

const verifyToken = require("../middlewares/auth/authJWT.js");
router.get("/membership-status", verifyToken, getUsershipStatus);
router.get("/membership-status/:userId", verifyToken, getMembershipStatus);
router.post("/recharge-user-membership/:userId", verifyToken, rechargerUserMembership);

module.exports = router;