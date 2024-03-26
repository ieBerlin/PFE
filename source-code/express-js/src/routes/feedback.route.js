const express = require("express");
const router = express.Router();
const getAllFeedbacks = require("../controllers/feedback/getAllFeedbacks.js");
const getFilteredFeedbacksByType = require("../controllers/feedback/getFilteredFeedbacksByType.js");
const getFilteredFeedbacksByUser = require("../controllers/feedback/getFilteredFeedbacksByUser.js");
const getFilteredFeedbacksByUserType = require("../controllers/feedback/getFilteredFeedbacksByUserType.js");
const getSingleFeedback = require("../controllers/feedback/getSingleFeedback.js");
const createFeedback = require("../controllers/feedback/createFeedback.js");
const updateFeedback = require("../controllers/feedback/updateFeedback.js");
const deleteFeedback = require("../controllers/feedback/deleteFeedback.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authUserRole = require('../middlewares/auth/authUserRole.js')
router.get("/", getAllFeedbacks);
router.get("/:feedback-type", getFilteredFeedbacksByType);
router.get("/:feedback-user", getFilteredFeedbacksByUser);
router.get("/:feedback-user/::feedback-type", getFilteredFeedbacksByUserType);
router.get("/:feedbackId", getSingleFeedback);
router.post("/", verifyToken, authUserRole, createFeedback);
router.put("/:feedbackId", verifyToken, authUserRole, updateFeedback);
router.delete("/:feedbackId", verifyToken, authUserRole, deleteFeedback);

module.exports = router;