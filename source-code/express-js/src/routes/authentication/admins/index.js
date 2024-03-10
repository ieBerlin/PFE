const express = require('express');
const router = express.Router();
const createAdmin = require('../../../controllers/authentication/admins/signup.js')
const loginAdmin = require('../../../controllers/authentication/admins/login.js')
const verifyToken = require('../../../middlewares/auth/authJWT.js')
router.route('/signup').post(createAdmin);
router.route('/login').post(verifyToken, loginAdmin);

module.exports = router