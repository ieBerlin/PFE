const { pool } = require("../../models/db/connect.js");

const getSingleClass = async(req, res) => {
    try {
        const classId = parseInt(req.params.classId);
        if (isNaN(classId)) {
            return res.status(400).json({ message: "Invalid class id parameter" });
        }

        const [classResult] = await pool.query(
            "SELECT * FROM classes WHERE classId = ?", [classId]
        );
        if (classResult.length === 0) {
            return res.status(404).json({ message: "Class not found" });
        }

        const classData = classResult[0];

        const userRole = req.userRole;
        const userId = req.userId;
        const [enrollmentResult] = await pool.query(
            "SELECT status FROM enrollmentrequests WHERE class_id = ? AND applicant_user_id = ?", [classId, userId]
        );

        const [instructorResults] = await pool.query(
            'SELECT userId,email, CONCAT(first_name," ", last_name) AS name FROM users WHERE userId = ?', [classData.instructorId]
        );
        if (userRole === "member") {

            let status = null;
            if (classData.current_enrollment_count >= classData.maximum_capacity) {
                status = "full";
            } else if (enrollmentResult[0]) {
                status = "pending";
            }
            console.log(instructorResults[0]);
            return res.status(200).json({
                classData,
                instructorData: instructorResults[0],
                enrollmentResult: { status },
            });
        } else {
            return res.status(200).json({ message: "Class status", classData, instructorData: instructorResults[0], enrollmentResult: enrollmentResult[0] });
        }
    } catch (error) {
        console.error("Error retrieving class:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getSingleClass;