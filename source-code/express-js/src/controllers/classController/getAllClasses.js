const { pool } = require('../../models/db/connect.js');

const getAllClasses = async(req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM classes');

        const classesWithInstructorInfo = await Promise.all(results.map(async(classItem) => {
            const [result] = await pool.query('SELECT userId FROM users WHERE email = ?', [classItem.instructor_email]);
            const instructor_id = result[0].userId;
            const [instructorInfo] = await pool.query('SELECT coachId, totalTrainedMembers, experienceLevel, specialization FROM coaches WHERE coachId = ?', [instructor_id]);

            return {
                ...classItem,
                instructor_extra_info: instructorInfo[0]
            };
        }));

        return res.status(200).json(classesWithInstructorInfo);
    } catch (error) {
        console.error('Error retrieving classes:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllClasses;