const { pool } = require('../../models/db/connect.js');

const getUserTransactionId = async(req, res) => {
    const { userId } = req.params
    try {
        const [result] = await pool.query('SELECT transactionId AS id, transactionDate AS date, transactionNotes AS description, transactionMethod	AS title FROM transactions WHERE userId = ?', [userId]);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getUserTransactionId;