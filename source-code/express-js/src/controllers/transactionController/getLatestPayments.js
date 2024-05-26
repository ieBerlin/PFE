const { pool } = require('../../models/db/connect.js');

const getLatestTransactions = async(req, res) => {
    try {
        const [transactions] = await pool.query('SELECT * FROM transactions WHERE transactionDate >= CURDATE() - INTERVAL 7 DAY');

        return res.status(200).json(transactions);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getLatestTransactions;