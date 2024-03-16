const express = require("express");
const router = express.Router();
const getMembershipPlans = require("../../controllers/membershipPlans/getMembershipPlans.js");
const getMembershipPlan = require("../../controllers/membershipPlans/getMembershipPlan.js");
const postMembershipPlan = require("../../controllers/membershipPlans/postMembershipPlan.js");
const updateMembershipPlan = require("../../controllers/membershipPlans/updateMembershipPlan.js");
const deleteMembershipPlan = require("../../controllers/membershipPlans/deleteMembershipPlan.js");

router.get("/:planId", getMembershipPlan);
router.get("/", getMembershipPlans);
router.post("/", postMembershipPlan);
router.put("/:planId", updateMembershipPlan);
router.delete("/:planId", deleteMembershipPlan);

module.exports = router;