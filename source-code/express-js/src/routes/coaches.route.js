const express = require("express");
const router = express.Router();
const getSingleCoach = require("../controllers/users/getSingleCoach.js");
const getAllCoach = require("../controllers/users/getAllCoach.js");
const getAllCoaches = require("../controllers/users/getAllCoaches.js");
const verifyToken = require("../middlewares/auth/authJWT.js");

router.get('/get-all-coaches', verifyToken, getAllCoaches);
router.get('/:coachId', verifyToken, getSingleCoach);
router.get('/', verifyToken, getAllCoach);

module.exports = router;