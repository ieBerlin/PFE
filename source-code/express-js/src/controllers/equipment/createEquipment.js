const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");
const createEquipment = async(req, res) => {
    const { userRole } = req;
    if (!userRole || !userRole === "admin" || !userRole === "manager") {
        res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const {
            name,
            description,
            quantity,
            max_quantity
        } = req.body;
        if (!name ||
            !description ||
            !quantity ||
            !max_quantity

        ) {
            return res
                .status(400)
                .json({
                    message: "name, description, quantity, max_quantity are required",
                });
        }
        const sql =
            "INSERT INTO equipment(name,description,quantity,max_quantity,created_at,availableQuantity) VALUES(?,?,?,?,?,?)";
        const values = [
            name,
            description,
            quantity,
            max_quantity,
            getCurrentDateTime(),
            quantity

        ];
        await pool.query(sql, values);
        return res.status(201).json({ message: "Equipment created successfully" });
    } catch (error) {
        console.error("Error creating equipment record:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createEquipment;