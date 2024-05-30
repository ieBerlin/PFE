const { pool } = require("../../models/db/connect");

const getAllClasses = async(req, res) => {
    try {
        // Check user role
        const { userRole } = req;
        let query = 'SELECT * FROM classes';
        if (userRole === 'member' || userRole === 'coach') {
            query += ' WHERE status = "open"';
        }

        const [results] = await pool.query(query);

        const classesWithInstructorInfo = await Promise.all(results.map(async(classItem) => {
            const [instructorInfo] = await pool.query('SELECT coachId, totalTrainedMembers, experienceLevel, specialization FROM coaches WHERE coachId = ?', [classItem.instructorId]);

            if (instructorInfo.length > 0) {
                const userId = instructorInfo[0].coachId; // Assuming the userId is stored in the coachId column
                const [user] = await pool.query('SELECT image,CONCAT(first_name," ",last_name) AS name FROM users WHERE userId = ?', [userId]);
                const instructorExtraInfo = {
                    ...instructorInfo[0],
                    image: user.length > 0 ? user[0].image : null,
                    name: user.length > 0 ? user[0].name : null // Assuming the image column in the users table stores the image path
                };

                return {
                    ...classItem,
                    instructor_extra_info: instructorExtraInfo
                };
            } else {
                return {
                    ...classItem,
                    instructor_extra_info: null
                };
            }
        }));


        return res.status(200).json(classesWithInstructorInfo);
    } catch (error) {
        console.error('Error retrieving classes:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getAllClasses;