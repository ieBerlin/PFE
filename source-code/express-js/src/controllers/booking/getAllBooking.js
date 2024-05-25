const { pool } = require("../../models/db/connect.js");

const getBooking = async (req, res) => {
  try {
    // Fetch all bookings
    const [bookings_results] = await pool.query("SELECT * FROM bookings");

    // Map over bookings and fetch equipment price and user role
    const equipmentsResult = await Promise.all(
      bookings_results.map(async (item) => {
        // Fetch equipment price
        const [equipmentResult] = await pool.query(
          "SELECT price FROM equipment WHERE id = ?",
          [item.equipmentId]
        );

        // Fetch user role
        const [userRoleResult] = await pool.query(
          "SELECT role FROM users WHERE userId = ?",
          [item.userId]
        );

        // Format the booking date and time
        const date = new Date(item.bookingDate);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US");
        delete item.bookingDate;
        // Return combined result with formatted date and time
        return {
          ...item,
          price: equipmentResult[0]?.price,
          staff: userRoleResult[0]?.role,
          date: formattedDate,
          time: formattedTime,
        };
      })
    );

    return res.status(200).json(equipmentsResult);
  } catch (error) {
    console.error("Error retrieving booking:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getBooking;
