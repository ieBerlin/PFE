const jwt = require('jsonwebtoken');
const { pool } = require("../../models/db/connect"); // Assuming `pool` is imported from appropriate file
const SECRET_KEY = require("../../config/jwt_secret");

const fetchUserBasicInformations = async(req, res) => {
    console.log('Hello World!')
    try {
        const { userEmail } = req;
        console.log(userEmail)
        const sql = 'SELECT username, first_name FROM users WHERE email = ?';
        const [result] = await pool.query(sql, [userEmail]);

        if (result.length > 0) {
            // Simulating delay for demonstration purposes
            setTimeout(() => {
                return res.status(200).json(result[0]);
            }, 1500);
        } else {
            return res.status(404).json({ message: 'No user found with the provided email' });
        }
    } catch (error) {
        console.error('Error retrieving user basic information:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = fetchUserBasicInformations;