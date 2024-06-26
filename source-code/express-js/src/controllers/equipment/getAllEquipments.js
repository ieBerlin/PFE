const { pool } = require('../../models/db/connect.js');

const getAllEquipments = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM equipment');
        return res.status(200).json(result);

    } catch (error) {
        console.error('Error retrieving equipment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllEquipments;