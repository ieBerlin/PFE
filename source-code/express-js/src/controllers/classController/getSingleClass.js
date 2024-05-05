const { pool } = require('../../models/db/connect.js');

const getSingleClass = async(req, res) => {
    try {
        const classId = parseInt(req.params.classId);
        if (isNaN(classId)) {
            return res.status(400).json({ message: 'Invalid class id parameter' });
        }
        const [result] = await pool.query('SELECT * FROM classes WHERE classId = ?', [classId]);
        console.log(result)
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ message: 'Class not found' });
        }
    } catch (error) {
        console.error('Error retrieving class:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getSingleClass;