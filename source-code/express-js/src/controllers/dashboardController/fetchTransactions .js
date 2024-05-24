const { pool } = require('../../models/db/connect.js');

const getTransactions = async(req, res) => {
    console.log("getTransactions")
    try {
        // Query to fetch transactions from the database
        const query = 'SELECT transactionType AS title, CONCAT(transactionDate, " ", transactionTime) AS date, transactionNotes AS description FROM transactions';
        const [results] = await pool.query(query);
        console.log(results)

        res.status(200).json(results);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getTransactions;