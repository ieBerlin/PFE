const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");
const createEquipment = async(req, res) => {

    try {
        const {
            memberId,
            equipmentId
        } = req.body;
        if (!memberId || !equipmentId

        ) {
            return res
                .status(400)
                .json({
                    message: "The booking request has been rejected by the system.",
                });
        }
        const sql =
            "INSERT INTO bookings(memberId,equipmentId,bookingDate,status) VALUES(?,?,?,?)";
        const values = [
            memberId,
            equipmentId,
            getCurrentDateTime(),
            'pending'

        ];
        await pool.query(sql, values);
        return res.status(201).json({ message: "The booking request has been submitted." });
    } catch (error) {
        console.error("Error creating booking record:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createEquipment;