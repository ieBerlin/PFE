const { pool } = require('../../models/db/connect.js');

const getAllCertifications = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM certification WHERE coachId = ?', [req.userId]);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving certifications:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllCertifications;