const express = require("express");
const router = express.Router();
const getSingleCoach = require("../controllers/users/getSingleCoach.js");
const getAllDBCoaches = require("../controllers/users/getAllCoach.js");
const getAllCoaches = require("../controllers/users/getAllCoaches.js");
const getUserCoaches = require("../controllers/users/getUserCoaches.js");
const verifyToken = require("../middlewares/auth/authJWT.js");

router.get('/get-user-coaches', verifyToken, getUserCoaches);
router.get('/get-all-coaches', verifyToken, getAllCoaches);
router.get('/', verifyToken, getAllDBCoaches);
router.get('/:coachId', verifyToken, getSingleCoach);

module.exports = router;