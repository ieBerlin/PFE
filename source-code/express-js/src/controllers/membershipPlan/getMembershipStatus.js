const { pool } = require("../../models/db/connect");

const getMembershipStatus = async(req, res) => {
    const { userEmail } = req;

    try {
        const [result] = await pool.query(
            `SELECT startDate, endDate 
             FROM membershipStatus 
             WHERE userEmail = ? 
             AND startDate <= NOW() 
             AND endDate >= DATE_SUB(NOW(), INTERVAL 30 DAY)`, [userEmail]
        );

        if (result.length > 0) {
            return res.json({
                status: true,
                from: result[0].startDate,
                to: result[0].endDate
            });
        } else {
            return res.json({ status: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getMembershipStatus;