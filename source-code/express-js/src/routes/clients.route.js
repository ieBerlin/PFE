const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const getAllClients = require('../controllers/clientsController/getAllClients.js');
const getCoach = require('../controllers/clientsController/getCoach.js');
const deleteRequest = require('../controllers/clientsController/deleteRequest.js');
const enrollWithCoach = require('../controllers/clientsController/enrollWithCoach.js');
const confirmEnroll = require('../controllers/clientsController/confirmEnroll.js');
const createNotification = require("../controllers/notification/createNotification.js");

router.post("/", verifyToken, getAllClients);
router.get('/get-coach/:coachId', verifyToken, getCoach);
router.post("/enroll/:coachId", verifyToken, enrollWithCoach);
router.put("/enroll", verifyToken, confirmEnroll, createNotification);
router.delete('/delete-coach/:coachId', verifyToken, deleteRequest);

module.exports = router;