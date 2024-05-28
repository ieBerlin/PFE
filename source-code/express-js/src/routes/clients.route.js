const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const getAllClients = require('../controllers/clientsController/getAllClients.js');
const getCoach = require('../controllers/clientsController/getCoach.js');
const enrollWithCoach = require('../controllers/clientsController/enrollWithCoach.js');

router.get("/", verifyToken, getAllClients);
router.get('/get-coach/:coachId', verifyToken, getCoach);
router.post("/enroll/:coachId", verifyToken, enrollWithCoach);

module.exports = router;