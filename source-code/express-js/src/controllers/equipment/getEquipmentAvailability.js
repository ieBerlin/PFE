const { pool } = require("../../models/db/connect");

const getEquipmentAvailability = async(req, res) => {
    const { userId } = req;
    const { equipmentId } = req.params;

    if (!equipmentId) {
        return res.status(400).json({
            message: "Missing required fields for booking.",
        });
    }

    try {
        // Check if the user already has a booking with status 'pending' or 'confirmed'
        const bookingStatusQuery = `
            SELECT status 
            FROM bookings 
            WHERE userId = ? 
            AND equipmentId = ? 
            AND (status = 'pending' OR status = 'confirmed')
        `;
        const bookingStatusValues = [userId, equipmentId];
        const [bookingStatusResult] = await pool.query(bookingStatusQuery, bookingStatusValues);

        if (bookingStatusResult.length > 0) {
            return res.status(400).json({ unavailability: bookingStatusResult[0].status });
        }

        // Check equipment availability
        const equipmentQuery = `
            SELECT max_quantity, availableQuantity 
            FROM equipment 
            WHERE id = ?
        `;
        const equipmentValues = [equipmentId];
        const [equipmentResult] = await pool.query(equipmentQuery, equipmentValues);

        if (equipmentResult.length === 0) {
            return res.status(404).json({ message: "Equipment not found." });
        }

        if (equipmentResult[0].availableQuantity <= 0) {
            return res.status(400).json({ status: "Out Of Stock" });
        }

        return res.status(200).json({ availability: true });
    } catch (error) {
        console.error("Error checking equipment availability:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getEquipmentAvailability;