const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");

const updateEquipment = async(req, res) => {
    try {
        const equipmentId = parseInt(req.params.equipmentId);
        if (isNaN(equipmentId)) {
            return res.status(400).json({ message: 'Invalid equipment id parameter' });
        }

        const { name, description, max_quantity, category, availableQuantity, image } = req.body;
        let errors = {};

        if (!name) {
            errors.name = "No provided name.";
        }
        if (!description) {
            errors.description = "No provided description.";
        }

        if (!max_quantity) {
            errors.max_quantity = "No provided max quantity.";
        }
        if (!category) {
            errors.category = "No provided category.";
        }
        if (!availableQuantity) {
            errors.availableQuantity = "No provided available quantity.";
        }
        // if (!image) {
        //     errors.image = "No provided image.";
        // }

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        const sql = `
            UPDATE equipment 
            SET name = ?, description = ?,  max_quantity = ?, availableQuantity = ?,  category = ?,updated_at =?
            WHERE id = ?
        `;
        const values = [name, description, max_quantity, availableQuantity, category, getCurrentDateTime(), equipmentId];

        await pool.query(sql, values);

        setTimeout(() => {
            return res.status(200).json({ message: "Equipment updated successfully" });
        }, 1000);
    } catch (error) {
        console.error("Error updating equipment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateEquipment;