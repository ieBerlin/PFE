const { pool } = require("../../models/db/connect.js");

const updateBookingStatus = async(req, res, next) => {
    try {
        const { status, userId } = req.body;
        console.log(req.body)
        const { bookingId } = req.params;
        if (!bookingId || !status) {
            return res.status(400).json({
                message: "Missing required fields for updating booking status.",
            });
        }

        const validStatuses = ["confirmed", "rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value.",
            });
        }


        const updateBookingQuery = "UPDATE bookings SET status = ? WHERE bookingId  = ?";
        const updateBookingValues = [status, bookingId];
        await pool.query(updateBookingQuery, updateBookingValues);
        if (status === "confirmed") {
            title = "Equipment Reservation Approved with Return Deadline"
            message =
                "Your equipment reservation has been approved! You're all set to use the equipment for your upcoming project. Just a reminder, please ensure to return it within the specified 10-day period to avoid any inconvenience. If you have any questions or need assistance, feel free to reach out. Happy working!"
        } else {
            title = "Equipment Reservation Rejected"
            message =
                " We regret to inform you that your equipment reservation request has been rejected. Unfortunately, all available equipment is currently allocated. We understand the importance of your project and apologize for any inconvenience this may cause. If you have any further queries or require assistance, please don't hesitate to contact us. We appreciate your understanding."
        }
        req.body = {
            title,
            message,
            userId,
        };
        next();
    } catch (error) {
        console.error("Error updating booking status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateBookingStatus;