const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const enrollWithCoach = async(req, res, next) => {
    const { userId } = req;
    const { status, memberId } = req.body;
    if (!status) {
        return res.status(400).json({ message: 'Invalid status' });
    }
    if (!memberId) {
        return res.status(400).json({ message: 'Invalid memberId' });
    }

    try {
        const sql = "UPDATE clients SET status = ? WHERE coach_id = ? AND member_id = ?";
        const values = [status, userId, memberId];
        const [result] = await pool.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No client found with the provided coach_id and member_id" });
        }

        if (status === "confirmed") {
            title = "Coach Messaging Accepted"
            message =
                "Congratulations! Your coaching messaging request has been accepted. You're now connected with your coach and can begin your sessions. Feel free to reach out to them to schedule your first meeting. Here's to a journey of growth and success together!"
        } else {
            title = "Coach Messaging Refused"
            message =
                "We regret to inform you that your coaching messaging request has been refused. Unfortunately, all available coaches are currently fully booked or your specific requirements couldn't be matched. We understand your disappointment and apologize for any inconvenience this may cause. If you have any further questions or need assistance, please don't hesitate to contact us. Thank you for considering our coaching services."
        }
        req.body = {
            title,
            message,
            userId: memberId,
        };
        next();
    } catch (error) {
        console.error('Error updating class:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = enrollWithCoach;