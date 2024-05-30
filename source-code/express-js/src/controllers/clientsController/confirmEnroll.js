const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const enrollWithCoach = async(req, res) => {
    const { userId } = req;
    const { status, memberId } = req.body;
    console.log(userId)
    console.log(status)
    console.log(memberId)
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

        return res.status(200).json({ message: "Class updated successfully" });
    } catch (error) {
        console.error('Error updating class:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = enrollWithCoach;