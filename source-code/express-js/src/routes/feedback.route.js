const express = require("express");
const router = express.Router();
const getFeedback = require("../controllers/feedback/getFeedback.js");
const getSingleFeedback = require("../controllers/feedback/getSingleFeedback.js");
const createFeedback = require("../controllers/feedback/createFeedback.js");
const updateFeedback = require("../controllers/feedback/updateFeedback.js");
const deleteFeedback = require("../controllers/feedback/deleteFeedback.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authUserRole = require('../middlewares/auth/authUserRole.js')
router.get("/", getFeedback);
router.get("/:feedbackId", getSingleFeedback);
router.post("/", verifyToken, authUserRole, createFeedback);
router.put("/:feedbackId", verifyToken, authUserRole, updateFeedback);
router.delete("/:feedbackId", verifyToken, authUserRole, deleteFeedback);

module.exports = router;