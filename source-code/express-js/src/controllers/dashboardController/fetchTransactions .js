const { pool } = require('../../models/db/connect.js');

const getTransactions = async(req, res) => {
    console.log("getTransactions");
    try {
        // Query to fetch transactions from the database, sorted by transactionDate
        const query = `
            SELECT transactionType AS title, 
                   transactionDate AS date, 
                   transactionNotes AS description 
            FROM transactions 
            ORDER BY transactionDate DESC, transactionTime ASC`;

        const [results] = await pool.query(query);

        res.status(200).json(results);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getTransactions;