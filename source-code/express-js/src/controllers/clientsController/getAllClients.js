const { pool } = require("../../models/db/connect.js");

const getAllClients = async (req, res) => {
  const { userId: coachId } = req;
  console.log(coachId)
  const status = req.body?.status;
  let sql;
  if (status) {
    sql = "SELECT * FROM clients WHERE coach_id = ? AND status='pending'";
  } else {
    sql = "SELECT * FROM clients WHERE coach_id = ? AND status='confirmed'";
  }
  try {
    const [clientResult] = await pool.query(sql, [coachId]);

    const clients = clientResult.map(async (client) => {
      const [userResult] = await pool.query(
        "SELECT CONCAT(first_name, ' ', last_name) AS name,email,image FROM users WHERE userId = ?",
        [client.member_id]
      );
      const userName = userResult[0].name;
      return { ...client, name: userName, email: userResult[0].email,image:userResult[0].image };
    });

    const clientsWithData = await Promise.all(clients);

    return res.status(200).json(clientsWithData);
  } catch (error) {
    console.error("Error retrieving clients:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllClients;
