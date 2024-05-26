const { pool } = require('../../models/db/connect.js');

const getAllCoach = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM coaches');
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllCoach;