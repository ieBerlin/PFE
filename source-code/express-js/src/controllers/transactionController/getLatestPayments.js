const { pool } = require('../../models/db/connect.js');
const { format, subDays } = require('date-fns');

const getLatestTransactions = async(req, res) => {
    try {
        const today = new Date();
        const lastSevenDays = [];
        for (let i = 0; i < 7; i++) {
            const date = subDays(today, i);
            lastSevenDays.push(format(date, 'yyyy-MM-dd'));
        }

        const [transactions] = await pool.query(`
            SELECT * FROM transactions 
            WHERE transactionDate >= CURDATE() - INTERVAL 7 DAY
        `);

        const transactionsByDate = lastSevenDays.reduce((acc, date) => {
            acc[date] = [];
            return acc;
        }, {});
        transactions.forEach(transaction => {
            const date = format(new Date(transaction.transactionDate), 'yyyy-MM-dd');
            if (transactionsByDate[date]) {
                transactionsByDate[date].push(transaction);
            }
        });

        const result = lastSevenDays.map(date => ({
            date,
            transactions: transactionsByDate[date]
        }));

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getLatestTransactions;