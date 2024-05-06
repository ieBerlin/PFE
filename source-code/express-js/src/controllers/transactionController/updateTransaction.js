const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const updateTransaction = async(req, res) => {
    try {
        const transactionId = parseInt(req.params.transactionId);
        if (isNaN(transactionId)) {
            return res.status(400).json({ message: 'Invalid transaction id parameter' });
        }
        const { amount, type, description, user_id } = req.body;
        let errors = {};

        if (!amount) {
            errors.amount = "No provided amount.";
        }
        if (!type) {
            errors.type = "No provided type.";
        }
        if (!description) {
            errors.description = "No provided description.";
        }
        if (!user_id) {
            errors.user_id = "No provided user ID.";
        }

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        const sql = `
            UPDATE transactions
            SET amount = ?, type = ?, description = ?, user_id = ?, updated_at = ?
            WHERE transactionId = ?
        `;
        const values = [amount, type, description, user_id, getCurrentDateTime(), transactionId];

        const [result] = await pool.query(sql, values);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Transaction updated successfully" });
        } else {
            return res.status(404).json({ message: "Transaction not found" });
        }
    } catch (error) {
        console.error("Error updating transaction:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateTransaction;