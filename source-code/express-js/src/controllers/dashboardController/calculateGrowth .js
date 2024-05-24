const { pool } = require("../../models/db/connect");

const calculateGrowth = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return (((current - previous) / previous) * 100).toFixed(2);
};

const getStatistics = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    // New Users
    const [newUsersCurrentMonth] = await pool.query(
      `
            SELECT COUNT(*) AS count 
            FROM users 
            WHERE MONTH(registration_date) = ? AND YEAR(registration_date) = ?`,
      [currentMonth, currentYear]
    );

    const [newUsersLastMonth] = await pool.query(
      `
            SELECT COUNT(*) AS count 
            FROM users 
            WHERE MONTH(registration_date) = ? AND YEAR(registration_date) = ?`,
      [lastMonth, lastMonthYear]
    );

    // Transactions
    const [transactionsCurrentMonth] = await pool.query(
      `
            SELECT paymentType, SUM(CAST(price AS DECIMAL(10, 2))) AS total 
            FROM transactions 
            WHERE MONTH(transactionDate) = ? AND YEAR(transactionDate) = ? 
            GROUP BY paymentType`,
      [currentMonth, currentYear]
    );

    const [transactionsLastMonth] = await pool.query(
      `
            SELECT paymentType, SUM(CAST(price AS DECIMAL(10, 2))) AS total 
            FROM transactions 
            WHERE MONTH(transactionDate) = ? AND YEAR(transactionDate) = ? 
            GROUP BY paymentType`,
      [lastMonth, lastMonthYear]
    );

    // Reserved Equipment
    const [reservedEquipmentsCurrentMonth] = await pool.query(
      `
            SELECT COUNT(*) AS count 
            FROM bookings 
            WHERE MONTH(STR_TO_DATE(bookingDate, '%Y-%m-%d')) = ? 
            AND YEAR(STR_TO_DATE(bookingDate, '%Y-%m-%d')) = ?`,
      [currentMonth, currentYear]
    );

    const [reservedEquipmentsLastMonth] = await pool.query(
      `
            SELECT COUNT(*) AS count 
            FROM bookings 
            WHERE MONTH(STR_TO_DATE(bookingDate, '%Y-%m-%d')) = ? 
            AND YEAR(STR_TO_DATE(bookingDate, '%Y-%m-%d')) = ?`,
      [lastMonth, lastMonthYear]
    );

    const response = {
      newUsers: {
        currentMonth: newUsersCurrentMonth[0].count,
        lastMonth: newUsersLastMonth[0].count,
        growth: calculateGrowth(
          newUsersCurrentMonth[0].count,
          newUsersLastMonth[0].count
        ),
      },
      transactions: {
        income: {
          currentMonth:
            transactionsCurrentMonth.find((tx) => tx.paymentType === "income")
              ?.total || 0,
          lastMonth:
            transactionsLastMonth.find((tx) => tx.paymentType === "income")
              ?.total || 0,
          growth: calculateGrowth(
            transactionsCurrentMonth.find((tx) => tx.paymentType === "income")
              ?.total || 0,
            transactionsLastMonth.find((tx) => tx.paymentType === "income")
              ?.total || 0
          ),
        },
        expense: {
          currentMonth:
            transactionsCurrentMonth.find((tx) => tx.paymentType === "expense")
              ?.total || 0,
          lastMonth:
            transactionsLastMonth.find((tx) => tx.paymentType === "expense")
              ?.total || 0,
          growth: calculateGrowth(
            transactionsCurrentMonth.find((tx) => tx.paymentType === "expense")
              ?.total || 0,
            transactionsLastMonth.find((tx) => tx.paymentType === "expense")
              ?.total || 0
          ),
        },
      },
      reservedEquipments: {
        currentMonth: reservedEquipmentsCurrentMonth[0].count,
        lastMonth: reservedEquipmentsLastMonth[0].count,
        growth: calculateGrowth(
          reservedEquipmentsCurrentMonth[0].count,
          reservedEquipmentsLastMonth[0].count
        ),
      },
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getStatistics;
