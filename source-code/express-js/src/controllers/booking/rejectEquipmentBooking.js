const { pool } = require("../../models/db/connect.js");

const rejectBooking = async(req, res) => {
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
            return res.status(400).json({ message: "The booking cannot be rejected as it's not in pending status." });
        }

        // Update the booking status to rejected
        const status = 'rejected';
        const sql = "UPDATE bookings SET status = ? WHERE bookingId = ?";
        const values = [status, bookingId];
        await pool.query(sql, values);

        return res.status(200).json({ message: "The booking has been rejected successfully." });
    } catch (error) {
        console.error("Error rejecting booking:", error);
        return res.status(500).json({ message: "Internal Server Error. Failed to reject booking." });
    }
};

module.exports = rejectBooking;