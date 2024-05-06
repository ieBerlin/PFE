const { pool } = require('../../models/db/connect.js');

const getSingleTransaction = async(req, res) => {
    try {
        const transactionId = parseInt(req.params.transactionId);
        if (isNaN(transactionId)) {
            return res.status(400).json({ message: 'Invalid transaction id parameter' });
        }
        const [result] = await pool.query('SELECT * FROM transactions WHERE transactionId = ?', [transactionId]);
        console.log(result);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error retrieving transaction:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getSingleTransaction;