const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth/authJWT.js");
const getAllClients = require('../controllers/clientsController/getAllClients.js');

router.get("/", verifyToken, getAllClients);


module.exports = router;