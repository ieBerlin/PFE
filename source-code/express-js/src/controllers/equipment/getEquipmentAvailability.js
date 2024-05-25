const { pool } = require("../../models/db/connect");

const getEquipmentAvailability = async(req, res) => {
    const { userId } = req;
    const { equipmentId } = req.params;
    if (!equipmentId) {
        return res.status(400).json({
            message: "Missing required fields for booking.",
        });
    }
    const bookingCountQuery =
        "SELECT COUNT(*) AS totalBookings FROM bookings WHERE userId = ? AND ( status = 'pending' OR status='reserved') AND equipmentId= ?";
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
        return res.status(400).json({ unavailability: "Reserved" });
    }
    const equipmentQuery =
        "SELECT max_quantity, availableQuantity FROM equipment WHERE id = ?";
    const equipmentValues = [equipmentId];
    const [equipmentResult] = await pool.query(equipmentQuery, equipmentValues);
    if (
        equipmentResult &&
        equipmentResult.length > 0 &&
        equipmentResult[0].max_quantity <= equipmentResult[0].availableQuantity
    ) {
        return res.status(400).json({ unavailability: "Out Of Stock" });
    }
    return res.status(200).json({ availability: true });
};
module.exports = getEquipmentAvailability;