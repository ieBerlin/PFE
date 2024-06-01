const { pool } = require("../../models/db/connect");

const rechargeMembership = async(req, res, next) => {
    const { userId: reqUserId } = req.params;
    const { rechargeAmount, membershipType } = req.body;
    let errors = {};

    if (!rechargeAmount) {
        errors.rechargeAmount = "Please provide a valid recharge amount.";
    }
    if (!membershipType) {
        errors.membershipType = "Please provide a valid membership type.";
    }
    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    try {
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
        await pool.query(
            `INSERT INTO transactions (userId, transactionType,transactionMethod,price,paymentType,transactionStatus) 
             VALUES (?,'Membership Fee','Cash',?,'income','completed')`, [reqUserId, rechargeAmount]
        );
        let title = "User Account Recharged Successfully";
        let message = "Your account has been successfully recharged with the requested amount. You now have access to all features and services on our platform without interruption. If you encounter any difficulties or have questions, please don't hesitate to contact us. We're here to assist you every step of the way. Thank you for being a valued member of our platform!"

        req.body = {
            title,
            message,
            userId: reqUserId
        }
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = rechargeMembership;