const { pool } = require('../../models/db/connect.js');

const getAllTransactions = async(req, res) => {
    try {
        const [transactions] = await pool.query('SELECT * FROM transactions');

        for (let transaction of transactions) {
            if (transaction.userId !== null) {
                const [userResult] = await pool.query(
                    'SELECT email, first_name, last_name FROM users WHERE userId = ?', [transaction.userId]
                );
                if (userResult.length > 0) {
                    const user = userResult[0];
                    transaction.userEmail = user.email;
                    transaction.name = user.first_name + " " + user.last_name;
                } else {
                    // If no user found, you can handle it accordingly, maybe setting it to null or empty
                    transaction.userEmail = null;
                    transaction.first_name = null;
                    transaction.last_name = null;
                }
            } else {
                transaction.userEmail = null;
                transaction.first_name = null;
                transaction.last_name = null;
            }

        }

        return res.status(200).json(transactions);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllTransactions;