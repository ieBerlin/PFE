const { pool } = require("../../models/db/connect.js");
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");

const confirmEquipmentBooking = async(req, res) => {
    try {
        const { bookingId } = req.params;

        if (!bookingId) {
            return res.status(400).json({ message: "No booking ID provided." });
        }

        // Check if the booking exists
        const [result] = await pool.query('SELECT * FROM bookings WHERE bookingId = ?', [bookingId]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        // Check if the booking is pending
        const booking = result[0];
        if (booking.status !== 'pending') {
            return res.status(400).json({ message: "The booking cannot be confirmed as it's not in pending status." });
        }

        // Update the booking status to confirmed
        const status = 'confirmed';
        const actionDate = getCurrentDateTime();
        const sql = "UPDATE bookings SET status = ?, actionDate = ? WHERE bookingId = ?";
        const values = [status, actionDate, bookingId];
        await pool.query(sql, values);

        return res.status(200).json({ message: "The booking request has been confirmed successfully." });
    } catch (error) {
        console.error("Error confirming booking:", error);
        return res.status(500).json({ message: "Internal Server Error. Failed to confirm booking." });
    }
};

module.exports = confirmEquipmentBooking;