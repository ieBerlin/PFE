const { pool } = require('../../models/db/connect.js');

const getSingleBooking = async(req, res) => {
    try {
        const bookingId = parseInt(req.params.bookingId);
        if (isNaN(bookingId)) {
            return res.status(400).json({ message: 'Invalid booking id parameter' });
        }
        const [result] = await pool.query('SELECT * FROM bookings WHERE bookingId = ?', [bookingId]);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error retrieving booking:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getSingleBooking;