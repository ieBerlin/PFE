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
            WHERE transactionDate BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
        `);

        const transactionsByDate = lastSevenDays.reduce((acc, date) => {
            acc[date] = { income: 0, expense: 0 };
            return acc;
        }, {});

        transactions.forEach(transaction => {
            const date = format(new Date(transaction.transactionDate), 'yyyy-MM-dd');
            if (transactionsByDate[date]) {
                if (transaction.paymentType === 'income') {
                    transactionsByDate[date].income += parseFloat(transaction.price);
                } else if (transaction.paymentType === 'expense') {
                    transactionsByDate[date].expense += parseFloat(transaction.price);
                }
            }
        });

        const result = lastSevenDays.map(date => ({
            date,
            income: transactionsByDate[date].income,
            expense: transactionsByDate[date].expense,
            paymentType: transactionsByDate[date].income > transactionsByDate[date].expense ? 'income' : 'expense'
        }));

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getLatestTransactions;