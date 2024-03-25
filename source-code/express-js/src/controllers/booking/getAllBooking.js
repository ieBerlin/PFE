const { pool } = require('../../models/db/connect.js');

const getBooking = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM bookings');
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'No booking found' });
        }
    } catch (error) {
        console.error('Error retrieving booking:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getBooking;