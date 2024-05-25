const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");
const createEquipment = async(req, res) => {
    try {
        const { equipmentId, color, size } = req.body;
        if (!equipmentId || !color || !size) {
            return res.status(400).json({
                message: "Missing required fields for booking.",
            });
        }
        const { userId } = req;
        const bookingCountQuery =
            "SELECT COUNT(*) AS totalBookings FROM bookings WHERE userId = ? AND status = 'pending' AND equipmentId = ?";
        const bookingCountValues = [userId, equipmentId];
        const [bookingCountResult] = await pool.query(
            bookingCountQuery,
            bookingCountValues
        );
        if (
            bookingCountResult &&
            bookingCountResult.length > 0 &&
            bookingCountResult[0].totalBookings
        ) {
            return res.status(400).json({ message: "User already has a booking." });
        }
        const equipmentQuery =
            "SELECT max_quantity, availableQuantity FROM equipment WHERE id = ?";
        const equipmentValues = [equipmentId];
        const [equipmentResult] = await pool.query(equipmentQuery, equipmentValues);
        if (
            equipmentResult &&
            equipmentResult.length > 0 &&
            equipmentResult[0].max_quantity < equipmentResult[0].availableQuantity
        ) {
            return res.status(400).json({ message: "Equipment is out of stock." });
        }

        const createBookingQuery =
            "INSERT INTO bookings(userId, equipmentId, bookingDate, status, color, size) VALUES (?, ?, ?, ?, ?, ?)";
        const createBookingValues = [
            userId,
            equipmentId,
            getCurrentDateTime(),
            "pending",
            color,
            size,
        ];
        await pool.query(createBookingQuery, createBookingValues);

        const updateEquipmentQuery =
            "UPDATE equipment SET availableQuantity = availableQuantity - 1 WHERE id = ?";
        const updateEquipmentValues = [equipmentId];
        await pool.query(updateEquipmentQuery, updateEquipmentValues);
        return res
            .status(201)
            .json({ message: "The booking request has been submitted." });
    } catch (error) {
        console.error("Error creating booking record:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createEquipment;