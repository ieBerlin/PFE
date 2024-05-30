const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");

const createEquipment = async(req, res) => {
    try {
        const { name, description, price, max_quantity, category, availableQuantity, image } = req.body;
        let errors = {};
        if (!name) {
            errors.name = "No provided name.";
        }
        if (!description) {
            errors.description = "No provided description.";
        }
        if (!max_quantity) {
            errors.max_quantity = "No provided max quantity.";
        } else if (+max_quantity <= 0) {
            errors.max_quantity = "Max quantity must be greater than 0.";
        }
        if (!category) {
            errors.category = "No provided category.";
        }
        if (!availableQuantity) {
            errors.availableQuantity = "No provided available quantity.";
        } else if (+availableQuantity <= 0) {
            errors.availableQuantity = "Available quantity must be greater than 0.";
        }
        if (max_quantity && availableQuantity && +max_quantity <= +availableQuantity) {
            errors.availableQuantity = "Available quantity must be less than max quantity.";
        }
        if (!price) {
            errors.price = "No provided price.";
        } else if (price <= 0) {
            errors.price = "Price must be greater than 0.";
        }
        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        const sql = "INSERT INTO equipment(name, description, max_quantity, created_at, availableQuantity, image, category,price) VALUES(?, ?, ?, ?, ?, ?, ?,?)";
        const values = [name, description, max_quantity, getCurrentDateTime(), availableQuantity, image, category, price];
        const [result] = await pool.query(sql, values);
        return res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error("Error creating equipment record:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createEquipment;