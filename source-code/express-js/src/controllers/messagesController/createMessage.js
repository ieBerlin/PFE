const { pool } = require("../../models/db/connect.js");

const createMessage = async(req, res) => {
    try {
        console.log(req.body);
        const { userId } = req;
        const { personBiD } = req.params;
        const { message } = req.body;
        let errors = {};

        if (!personBiD) {
            errors.otherPersonId = "Other person ID not provided";
        }
        if (!message) {
            errors.message = "Message content is required";
        }
        if (Object.keys(errors).length) {
            return res.status(400).json({ errors });
        }

        // Retrieve roles of userId and personBiD from the users table
        const [userRole] = await pool.query("SELECT role FROM users WHERE userId = ?", [userId]);

        // Determine the sender and receiver based on their roles
        let senderId, receiverId, whoSent;
        if (userRole[0].role === "coach") {
            senderId = "coach_id";
            receiverId = "member_id";
            whoSent = "coach";
        } else {
            senderId = "member_id";
            receiverId = "coach_id";
            whoSent = "member";
        }

        // Insert the message into the messages table
        const query = `INSERT INTO messages (${senderId}, ${receiverId}, message, whoSent) VALUES (?, ?, ?, ?)`;
        const values = [userId, personBiD, message, whoSent];

        await pool.query(query, values);

        return res.status(201).json({ message: "Message created successfully" });
    } catch (error) {
        console.error("Error creating message:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createMessage;