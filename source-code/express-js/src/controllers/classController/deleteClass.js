const { pool } = require('../../models/db/connect.js');

const deleteClass = async(req, res) => {
    try {
        const classId = parseInt(req.params.classId);
        if (isNaN(classId)) {
            return res.status(400).json({ message: 'Invalid class id parameter' });
        }
        const sql = "DELETE FROM classes WHERE classId = ?";
        setTimeout(async() => {
            const [result] = await pool.query(sql, [classId]);

            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Class deleted successfully" });
            } else {
                return res.status(404).json({ message: "Class not found" });
            }
        }, 1000);
    } catch (error) {
        console.error("Error deleting class:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = deleteClass;