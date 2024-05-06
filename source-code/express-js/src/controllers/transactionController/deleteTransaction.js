const { pool } = require('../../models/db/connect.js');

const deleteTransaction = async(req, res) => {
    try {
        const transactionId = parseInt(req.params.transactionId);
        if (isNaN(transactionId)) {
            return res.status(400).json({ message: 'Invalid transaction id parameter' });
        }
        const sql = "DELETE FROM transactions WHERE transactionId = ?";
        const [result] = await pool.query(sql, [transactionId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Transaction deleted successfully" });
        } else {
            return res.status(404).json({ message: "Transaction not found" });
        }
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = deleteTransaction;