// Import necessary modules
const { pool } = require('../../models/db/connect.js');

const deleteSport = async(req, res) => {
    try {
        const sportId = parseInt(req.params.sportId);

        if (isNaN(sportId)) {
            return res.status(400).json({ message: 'Invalid sport ID.' });
        }

        const sql = 'DELETE FROM sports WHERE sportId = ?';

        const [result] = await pool.query(sql, [sportId]);


        if (result.affectedRows > 0) {

            return res.status(200).json({ message: 'Sport deleted successfully.' });

        } else {

            return res.status(404).json({ message: 'Sport not found.' });
        }
    } catch (error) {

        console.error('Error deleting sport:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = deleteSport;