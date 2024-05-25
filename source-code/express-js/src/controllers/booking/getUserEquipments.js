const { pool } = require('../../models/db/connect.js');

const getUserEquipments = async(req, res) => {
    try {
        const { userId } = req;

        // Fetch all reserved equipment IDs for the user
        const [bookings] = await pool.query(
            'SELECT equipmentId FROM bookings WHERE userId = ? AND status = "reserved"', [userId]
        );

        // If no bookings found, return empty array
        if (bookings.length === 0) {
            return res.status(200).json([]);
        }

        // Fetch all equipment details for the booked equipment
        const equipmentIds = bookings.map(booking => booking.equipmentId);
        const placeholders = equipmentIds.map(() => '?').join(',');
        const [equipments] = await pool.query(
            `SELECT * FROM equipment WHERE id IN (${placeholders})`,
            equipmentIds
        );

        return res.status(200).json(equipments);

    } catch (error) {
        console.error('Error retrieving user equipment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getUserEquipments;