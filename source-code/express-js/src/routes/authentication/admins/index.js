const express = require('express');
const router = express.Router();
const {
    createAdmin,
    loginAdmin
} = require('../../../controllers/authentication/admins/index.js')
router.route('/signup').post(createAdmin);
router.route('/login').post(loginAdmin);

module.exports = router