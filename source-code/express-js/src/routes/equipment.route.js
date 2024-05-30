const express = require("express");
const router = express.Router();
const getAllEquipments = require("../controllers/equipment/getAllEquipments.js");
const getSingleEquipment = require("../controllers/equipment/getSingleEquipment.js");
const getEquipmentAvailability = require("../controllers/equipment/getEquipmentAvailability.js");
const createEquipment = require("../controllers/equipment/createEquipment.js");
const updateEquipment = require("../controllers/equipment/updateEquipment.js");
const updateEquipmentImage = require("../controllers/equipment/updateEquipmentImage.js");
const deleteEquipment = require("../controllers/equipment/deleteEquipment.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authAdminOrManager = require("../middlewares/auth/authAdminOrManager.js");
const { storageImage } = require("../utils/imageUploader/imageUploader.js");
router.get("/", verifyToken, getAllEquipments);
router.get("/check-availability/:equipmentId", verifyToken, getEquipmentAvailability);
router.get("/:equipmentId", getSingleEquipment);
router.post("/", verifyToken, createEquipment);
router.put("/:equipmentId", verifyToken, updateEquipment);
router.put("/update-equipment-image/:equipmentId", verifyToken, updateEquipmentImage);
router.delete(
    "/:equipmentId",
    verifyToken,
    authAdminOrManager,
    deleteEquipment
);

module.exports = router;