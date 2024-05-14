const { pool } = require("../../models/db/connect.js");

const getAllPayments = async (req, res) => {
  try {
    const lastSevenDays = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    const sql = "SELECT * FROM payments WHERE paymentDate >= ?";
    const [result] = await pool.query(sql, [lastSevenDays]);
    console.log(lastSevenDays);

    let expensePayments = [];
    let incomePayments = [];
    result.forEach((payment) => {
      if (payment.type === "expense") {
        expensePayments.push(payment);
      } else if (payment.type === "income") {
        incomePayments.push(payment);
      }
    });

    return res
      .status(200)
      .json({
        expensePayments,
        incomePayments,
        dates: generateLastDays(
          incomePayments.length > expensePayments.length
            ? incomePayments.length
            : expensePayments.length
        ),
      });
  } catch (error) {
    console.error("Error retrieving payments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllPayments;
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}-${year}`;
}

function generateLastDays(max) {
    console.log(max)
  const dates = [];
  const today = new Date();

  for (let i = max-1; i >= 0; i--) {
    const currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() - i);
    dates.push(formatDate(currentDate));
  }

  return dates;
}
