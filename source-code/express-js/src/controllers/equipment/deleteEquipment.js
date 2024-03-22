const { pool } = require("../../models/db/connect.js");

const deleteEquipment = async(req, res) => {
    try {
        const { userRole } = req;
        if (!userRole || userRole !== "admin") {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        const equipmentId = parseInt(req.params.equipmentId);
        if (isNaN(equipmentId)) {
            return res.status(400).json({ message: 'Invalid equipment id parameter' });
        }



        const sql = `DELETE FROM equipment WHERE id = ?`;
        const values = [equipmentId];

        const result = await pool.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        return res.status(200).json({ message: "Equipment deleted successfully" });
    } catch (error) {
        console.error("Error deleting equipment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = deleteEquipment;