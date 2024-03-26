const { pool } = require('../../models/db/connect.js');

const getSportById = async(req, res) => {
    try {
        const sportId = parseInt(req.params.sportId);
        if (isNaN(sportId)) {
            return res.status(400).json({ message: 'Invalid sport id parameter' });
        }
        const [result] = await pool.query('SELECT * FROM sports WHERE sportId = ?', [sportId]);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: 'Sport not found' });
        }
    } catch (error) {
        console.error('Error retrieving sport:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getSportById;