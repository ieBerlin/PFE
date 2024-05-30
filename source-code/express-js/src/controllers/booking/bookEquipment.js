const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");

const createEquipment = async(req, res) => {
    try {
        const { equipmentId } = req.body;
        if (!equipmentId) {
            return res.status(400).json({
                message: "Missing required fields for booking.",
            });
        }
        const { userId } = req;

        // Check if there's already a pending booking for the user and equipment
        const bookingCountQuery = `
            SELECT COUNT(*) AS totalBookings 
            FROM bookings 
            WHERE userId = ? 
            AND equipmentId = ? 
            AND status = 'pending'
        `;
        const bookingCountValues = [userId, equipmentId];
        const [bookingCountResult] = await pool.query(bookingCountQuery, bookingCountValues);

        if (bookingCountResult[0].totalBookings > 0) {
            return res.status(400).json({ message: "User already has a pending booking." });
        }

        // Check if there are any reservations that are within the 10-day deadline
        const currentDateTime = getCurrentDateTime();
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        const reservationCheckQuery = `
            SELECT COUNT(*) AS totalReservations 
            FROM bookings 
            WHERE userId = ? 
            AND equipmentId = ? 
            AND bookingDate >= ? 
            AND status IN ('pending', 'confirmed')
        `;
        const reservationCheckValues = [userId, equipmentId, tenDaysAgo];
        const [reservationCheckResult] = await pool.query(reservationCheckQuery, reservationCheckValues);

        if (reservationCheckResult[0].totalReservations > 0) {
            return res.status(400).json({ message: "User already has a reserved equipment within the 10-day return period." });
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
            return res.status(400).json({ message: "Equipment is out of stock." });
        }

        // Create the booking
        const createBookingQuery = `
            INSERT INTO bookings(userId, equipmentId, status, bookingDate) 
            VALUES (?, ?, ?, ?)
        `;
        const createBookingValues = [
            userId,
            equipmentId,
            "pending",
            currentDateTime
        ];
        await pool.query(createBookingQuery, createBookingValues);

        // Update equipment availability
        const updateEquipmentQuery = `
            UPDATE equipment 
            SET availableQuantity = availableQuantity - 1 
            WHERE id = ?
        `;
        const updateEquipmentValues = [equipmentId];
        await pool.query(updateEquipmentQuery, updateEquipmentValues);

        return res.status(201).json({ message: "The booking request has been submitted." });

    } catch (error) {
        console.error("Error creating booking record:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createEquipment;