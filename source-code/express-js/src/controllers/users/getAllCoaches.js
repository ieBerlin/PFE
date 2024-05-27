const { pool } = require('../../models/db/connect.js');

const getAllCoach = async(req, res) => {
    try {
        const userRole = req.userRole;
        let query = 'SELECT * FROM users';
        if (userRole === 'member') {
            query += ' WHERE role = "coach" AND status = "active"';
        }

        const [users] = await pool.query(query);

        // Loop over each user and get additional coach details
        const detailedResults = await Promise.all(users.map(async(user) => {
            const [coachDetails] = await pool.query('SELECT * FROM coaches WHERE userId = ?', [user.userId]);
            return {
                ...user,
                ...coachDetails[0]
            };
        }));

        return res.status(200).json(detailedResults);
    } catch (error) {
        console.error('Error retrieving coaches:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllCoach;