const express = require("express");
const router = express.Router();
const getMembershipPlans = require("../controllers/membershipPlan/getMembershipPlans.js");
const getMembershipPlan = require("../controllers/membershipPlan/getMembershipPlan.js");
const postMembershipPlan = require("../controllers/membershipPlan/postMembershipPlan.js");
const updateMembershipPlan = require("../controllers/membershipPlan/updateMembershipPlan.js");
const deleteMembershipPlan = require("../controllers/membershipPlan/deleteMembershipPlan.js");
const authAdminOrManager = require("../middlewares/auth/authAdminOrManager.js");
const verifyToken = require("../middlewares/auth/authJWT.js");

router.get("/:planId", getMembershipPlan);
router.get("/", getMembershipPlans);
router.post("/", verifyToken, authAdminOrManager, postMembershipPlan);
router.put("/:planId", verifyToken, authAdminOrManager, updateMembershipPlan);
router.delete("/:planId", verifyToken, authAdminOrManager, deleteMembershipPlan);

module.exports = router;