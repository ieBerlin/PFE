const { pool } = require("../../models/db/connect.js");

const getAllClients = async(req, res) => {
    const { userId: coachId } = req;
    try {
        const [clientResult] = await pool.query(
            "SELECT * FROM clients WHERE coach_id = ?", [coachId]
        );

        const clients = clientResult.map(async(client) => {
            const [userResult] = await pool.query(
                "SELECT CONCAT(first_name, ' ', last_name) AS name,email FROM users WHERE userId = ?", [client.member_id]
            );
            const userName = userResult[0].name;
            return {...client, name: userName, email: userResult[0].email };
        });

        const clientsWithData = await Promise.all(clients);

        return res.status(200).json(clientsWithData);
    } catch (error) {
        console.error("Error retrieving clients:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getAllClients;