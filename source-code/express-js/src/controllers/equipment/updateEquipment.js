const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");

const updateEquipment = async(req, res) => {
    try {
        const { userRole } = req;
        if (!userRole || !userRole === "admin" || !userRole === "manager") {
            res.status(401).json({ message: "Unauthorized!" });
        }
        const equipmentId = parseInt(req.params.equipmentId);
        if (isNaN(equipmentId)) {
            return res.status(400).json({ message: 'Invalid equipment id parameter' });
        }

        const { name, description, quantity, max_quantity, availableQuantity } = req.body;
        if (!name || !description || !quantity || !max_quantity) {
            return res.status(400).json({ message: "name, description, quantity, max_quantity,available quantity are required" });
        }

        const sql = `
            UPDATE equipment 
            SET name = ?, 
                description = ?, 
                quantity = ?, 
                max_quantity = ?, 
                updated_at = ?,
                availableQuantity
            WHERE id = ?
        `;
        const values = [name, description, quantity, max_quantity, getCurrentDateTime(), availableQuantity, equipmentId];

        await pool.query(sql, values);

        return res.status(200).json({ message: "Equipment updated successfully" });
    } catch (error) {
        console.error("Error updating equipment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateEquipment;