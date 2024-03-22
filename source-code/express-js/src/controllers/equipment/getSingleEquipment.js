const { pool } = require('../../models/db/connect.js');

const getSingleEquipment = async(req, res) => {
    try {
        const equipmentId = parseInt(req.params.equipmentId);
        if (isNaN(equipmentId)) {
            return res.status(400).json({ message: 'Invalid equipment id parameter' });
        }
        const [result] = await pool.query('SELECT * FROM equipment WHERE id = ?', [equipmentId]);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: 'Equipment not found' });
        }
    } catch (error) {
        console.error('Error retrieving equipment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getSingleEquipment;