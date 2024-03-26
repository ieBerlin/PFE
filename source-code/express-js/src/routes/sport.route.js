const express = require('express');
const verifyToken = require('../middlewares/auth/authJWT');
const authAdminOrManager = require('../middlewares/auth/authAdminOrManager');
const router = express.Router();
const getAllSports = require('../controllers/sport/getAllSports.js')
const getSportById = require('../controllers/sport/getSportById.js')
const createSport = require('../controllers/sport/createSport.js')
const updateSport = require('../controllers/sport/updateSport.js')
const deleteSport = require('../controllers/sport/deleteSport.js')
    // GET all sports
router.get('/', getAllSports);

// GET a single sport by ID
router.get('/:sportId', getSportById);

// POST a new sport
router.post('/', verifyToken, authAdminOrManager, createSport);

// PUT update a sport by ID
router.put('/:sportId', verifyToken, authAdminOrManager, updateSport);

// DELETE a sport by ID
router.delete('/:sportId', verifyToken, authAdminOrManager, deleteSport);

module.exports = router;