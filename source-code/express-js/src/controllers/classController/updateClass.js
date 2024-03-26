const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const updateClass = async(req, res) => {
    try {
        const classId = parseInt(req.params.classId);
        if (isNaN(classId)) {
            return res.status(400).json({ message: 'Invalid class id parameter' });
        }
        const { name, description, instructor_id, date, maximum_capacity, duration, status, category } = req.body;
        let errors = {};

        if (!name) {
            errors.name = "No provided name.";
        }
        if (!description) {
            errors.description = "No provided description.";
        }
        if (!instructor_id) {
            errors.instructor_id = "No provided instructor ID.";
        }
        if (!date) {
            errors.date = "No provided date.";
        }
        if (!maximum_capacity) {
            errors.maximum_capacity = "No provided maximum capacity.";
        }
        if (!duration) {
            errors.duration = "No provided duration.";
        }
        if (!status) {
            errors.status = "No provided status.";
        }
        if (!category) {
            errors.category = "No provided category.";
        }


        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }



        const sql = `
            UPDATE classes
            SET name = ?, description = ?, instructor_id = ?, date = ?, maximum_capacity = ?, duration = ?, status = ?, category = ?, updated_at = ?
            WHERE classId = ?
        `;
        const values = [name, description, instructor_id, date, maximum_capacity, duration, status, category, getCurrentDateTime(), classId];

        const [result] = await pool.query(sql, values);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Class updated successfully" });
        } else {
            return res.status(404).json({ message: "Class not found" });
        }
    } catch (error) {
        console.error("Error updating class:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateClass;