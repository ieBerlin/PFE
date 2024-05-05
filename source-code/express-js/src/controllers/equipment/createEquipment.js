const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");

const createEquipment = async(req, res) => {
    try {
        const { name, description, max_quantity, category, availableQuantity, image } = req.body;
        console.log(req.body)
        let errors = {};

        if (!name) {
            errors.name = "No provided name.";
        }
        if (!description) {
            errors.description = "No provided description.";
        }
        // if (!quantity) {
        //     errors.quantity = "No provided quantity.";
        // }
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

        const sql = "INSERT INTO equipment(name, description, max_quantity, created_at, availableQuantity, image, category) VALUES(?, ?, ?, ?, ?, ?, ?)";
        const values = [name, description, max_quantity, getCurrentDateTime(), availableQuantity, image, category];
        await pool.query(sql, values);

        return res.status(201).json({ message: "Equipment created successfully" });
    } catch (error) {
        console.error("Error creating equipment record:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createEquipment;