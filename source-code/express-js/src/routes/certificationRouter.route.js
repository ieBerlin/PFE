const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const getAllCertifications = require("../controllers/messagesController/getAllCertifications.js");
const createCertification = require("../controllers/messagesController/createCertification.js");
const deleteCertification = require("../controllers/messagesController/deleteCertification.js");
router.get("/", verifyToken, getAllCertifications);
router.post("/", verifyToken, createCertification);
router.delete("/:certificationId", verifyToken, deleteCertification);
module.exports = router;