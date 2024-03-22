const express = require("express");
const router = express.Router();
const getEquipment = require("../controllers/equipment/getEquipment.js");
const getSingleEquipment = require("../controllers/equipment/getSingleEquipment.js");
const createEquipment = require("../controllers/equipment/createEquipment.js");
const updateEquipment = require("../controllers/equipment/updateEquipment.js");
const deleteEquipment = require("../controllers/equipment/deleteEquipment.js");
const verifyToken = require("../middlewares/auth/authJWT.js");
const authAdmin = require("../middlewares/auth/authAdmin.js");

router.get("/", getEquipment);
router.get("/:equipmentId", getSingleEquipment);
router.post("/", verifyToken, authAdmin, createEquipment);
router.put("/:equipmentId", verifyToken, authAdmin, updateEquipment);
router.delete("/:equipmentId", verifyToken, authAdmin, deleteEquipment);

module.exports = router;