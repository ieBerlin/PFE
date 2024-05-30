const { pool } = require("../../models/db/connect");

const rechargeMembership = async(req, res) => {
    const { userId: reqUserId } = req.params;
    const { rechargeAmount, membershipType } = req.body;
    let errors = {};

    // Check if either rechargeAmount or membershipType is missing
    if (!rechargeAmount) {
        errors.rechargeAmount = "Please provide a valid recharge amount.";
    }
    if (!membershipType) {
        errors.membershipType = "Please provide a valid membership type.";
    }

    // If there are errors, return them
    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    try {
        // Check if there's an existing membership for the user
        const [existingMembership] = await pool.query(
            `SELECT * FROM memberships WHERE userId = ?`, [reqUserId]
        );

        if (existingMembership.length === 0) {
            // If no existing membership, create a new one
            await pool.query(
                `INSERT INTO memberships (userId, type, date_when, price) 
                 VALUES (?, ?, CURDATE(), ?)`, [reqUserId, membershipType, rechargeAmount]
            );
        } else {
            // If an existing membership exists, update it
            await pool.query(
                `UPDATE memberships 
                 SET type = ?, date_when = CURDATE(), price = ? 
                 WHERE userId = ?`, [membershipType, rechargeAmount, reqUserId]
            );
        }

        return res.json({ status: true, message: "Membership recharged successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = rechargeMembership;