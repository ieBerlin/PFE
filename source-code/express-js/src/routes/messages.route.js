const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const getMessages = require("../controllers/messagesController/getMessages.js");
const createMessage = require("../controllers/messagesController/createMessage.js");
router.get("/:personBiD", verifyToken, getMessages);
router.post("/:personBiD", verifyToken, createMessage);
module.exports = router;