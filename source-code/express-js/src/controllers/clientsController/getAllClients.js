    const { pool } = require('../../models/db/connect.js');

    const getAllClients = async(req, res) => {
        const userEmail = req.userEmail
        try {
            const [result] = await pool.query("SELECT * FROM clients WHERE coachEmail = ?", [userEmail]);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error retrieving clients:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    module.exports = getAllClients;