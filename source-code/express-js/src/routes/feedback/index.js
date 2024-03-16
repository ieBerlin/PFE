const express = require("express");
const router = express.Router();
const getFeedback = require("../../controllers/feedback/getFeedback.js");
const getSingleFeedback = require("../../controllers/feedback/getSingleFeedback.js");
const createFeedback = require("../../controllers/feedback/createFeedback.js");
const updateFeedback = require("../../controllers/feedback/updateFeedback.js");
const deleteFeedback = require("../../controllers/feedback/deleteFeedback.js");

router.get("/", getFeedback);
router.get("/:feedbackId", getSingleFeedback);
router.post("/", createFeedback);
router.put("/:feedbackId", updateFeedback);
router.delete("/:feedbackId", deleteFeedback);

module.exports = router;