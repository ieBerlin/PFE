const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const createTransaction = async(req, res) => {
    try {
        const { relatedUser: email, transactionType, method: transactionMethod, price, paymentType, status: transactionStatus, date: transactionDate, time: transactionTime, notes: transactionNotes } = req.body;
        let errors = {};
        if (!transactionType) {
            errors.transactionType = "No transaction type provided.";
        }
        if (!transactionMethod) {
            errors.transactionMethod = "No transaction method provided.";
        }
        if (!price) {
            errors.price = "No price provided.";
        }
        if (!paymentType) {
            errors.paymentType = "No payment type provided.";
        }
        if (!transactionStatus) {
            errors.transactionStatus = "No transaction status provided.";
        }
        if (!transactionDate) {
            errors.transactionDate = "No transaction date provided.";
        }
        if (!transactionTime) {
            errors.transactionTime = "No transaction time provided.";
        }

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        const sql = `
            INSERT INTO transactions (email, transactionType, transactionMethod, price, paymentType, transactionStatus, transactionDate, transactionTime, transactionNotes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [email, transactionType, transactionMethod, price, paymentType, transactionStatus, transactionDate, transactionTime, transactionNotes];

        await pool.query(sql, values);

        return res.status(201).json({ message: "Transaction created successfully" });
    } catch (error) {
        console.error("Error creating transaction:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createTransaction;