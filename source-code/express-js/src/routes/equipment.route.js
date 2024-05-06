const express = require("express");
const router = express.Router();
const getAllEquipments = require("../controllers/equipment/getAllEquipments.js");
const getSingleEquipment = require("../controllers/equipment/getSingleEquipment.js");
const createEquipment = require("../controllers/equipment/createEquipment.js");
const updateEquipment = require("../controllers/equipment/updateEquipment.js");
const deleteEquipment = require("../controllers/equipment/deleteEquipment.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authAdminOrManager = require("../middlewares/auth/authAdminOrManager.js");
router.get("/", getAllEquipments);
router.get("/:equipmentId", getSingleEquipment);
router.post("/", verifyToken, createEquipment);
router.put("/:equipmentId", verifyToken, updateEquipment);
router.delete(
    "/:equipmentId",
    verifyToken,
    authAdminOrManager,
    deleteEquipment
);

module.exports = router;