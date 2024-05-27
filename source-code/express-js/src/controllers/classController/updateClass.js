const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const updateClass = async(req, res) => {
    try {
        const classId = parseInt(req.params.classId);
        if (isNaN(classId)) {
            return res.status(400).json({ message: 'Invalid class id parameter' });
        }

        const { name, description, instructorId, startDate, startTime, endDate, endTime, maxSize, price, category } = req.body;
        let errors = {};

        if (!name) {
            errors.name = "No provided name.";
        }
        if (!description) {
            errors.description = "No provided description.";
        }
        if (!instructorId) {
            errors.instructorId = "No provided instructor ID.";
        }
        if (!startDate || !startTime) {
            errors.startDateTime = "No provided start date or time.";
        }
        if (!endDate || !endTime) {
            errors.endDateTime = "No provided end date or time.";
        }
        if (!maxSize) {
            errors.maxSize = "No provided maximum capacity.";
        }
        if (!price) {
            errors.price = "No provided price.";
        }
        if (!category) {
            errors.category = "No provided category.";
        }

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        const sql = `
            UPDATE classes
            SET name = ?, description = ?, instructorId = ?, startDate = ?, startTime = ?, endDate = ?, endTime = ?, maximum_capacity = ?, price = ?, category = ?, updated_at = ?
            WHERE classId = ?
        `;
        const values = [name, description, instructorId, startDate, startTime, endDate, endTime, maxSize, price, category, getCurrentDateTime(), classId];

        const [result] = await pool.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Class not found' });
        }

        return res.status(200).json({ message: "Class updated successfully" });
    } catch (error) {
        console.error('Error updating class:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateClass;