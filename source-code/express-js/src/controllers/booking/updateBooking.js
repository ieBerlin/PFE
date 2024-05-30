const { pool } = require("../../models/db/connect.js");

const updateBookingStatus = async(req, res) => {
    try {
        const { status } = req.body;
        const { bookingId } = req.params;
        if (!bookingId || !status) {
            return res.status(400).json({
                message: "Missing required fields for updating booking status.",
            });
        }

        const validStatuses = ["pending", "confirmed", "rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value.",
            });
        }


        const updateBookingQuery = "UPDATE bookings SET status = ? WHERE bookingId  = ?";
        const updateBookingValues = [status, bookingId];
        await pool.query(updateBookingQuery, updateBookingValues);

        return res.status(200).json({ message: "Booking status has been updated." });
    } catch (error) {
        console.error("Error updating booking status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateBookingStatus;