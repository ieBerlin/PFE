const express = require("express");
const router = express.Router();
const getMembershipPlans = require("../../controllers/membershipPlan/getMembershipPlans.js");
const getMembershipPlan = require("../../controllers/membershipPlan/getMembershipPlan.js");
const postMembershipPlan = require("../../controllers/membershipPlan/postMembershipPlan.js");
const updateMembershipPlan = require("../../controllers/membershipPlan/updateMembershipPlan.js");
const deleteMembershipPlan = require("../../controllers/membershipPlan/deleteMembershipPlan.js");

router.get("/:planId", getMembershipPlan);
router.get("/", getMembershipPlans);
router.post("/", postMembershipPlan);
router.put("/:planId", updateMembershipPlan);
router.delete("/:planId", deleteMembershipPlan);

module.exports = router;