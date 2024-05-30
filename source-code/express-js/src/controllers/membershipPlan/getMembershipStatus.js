const { pool } = require("../../models/db/connect");

const getMembershipStatus = async(req, res) => {
    const { userId } = req.params;
    try {
        // Check if there's a membership for the user
        const [membershipResult] = await pool.query(
            `SELECT 
                type,
                date_when AS startDate,
                DATE_ADD(date_when, INTERVAL CASE 
                    WHEN type = 'basic' THEN 30 
                    WHEN type = 'standard' THEN 30 
                    WHEN type = 'premium' THEN 365 
                END DAY) AS endDate
            FROM memberships
            WHERE userId = ?`, [userId]
        );

        if (membershipResult.length === 0) {
            return res.status(200).json({ status: false, message: "No membership found for the user" });
        }

        const { type, startDate, endDate } = membershipResult[0];

        // Check if there are days left in the membership
        const currentDate = new Date();
        const remainingDays = Math.ceil((new Date(endDate) - currentDate) / (1000 * 60 * 60 * 24));

        if (remainingDays <= 0) {
            setTimeout(() => {
                return res.json({ status: false, message: "Membership expired" });
            }, 1000); // Delay of 1 second before sending the response
        }

        setTimeout(() => {
            return res.json({
                status: true,
                from: startDate,
                to: endDate,
                daysLeft: remainingDays
            });
        }, 4000); // Delay of 1 second before sending the response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getMembershipStatus;