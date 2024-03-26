const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const createClass = async(req, res) => {
    try {
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
            INSERT INTO classes (name, description, instructor_id, date, maximum_capacity, current_enrollement_count, duration, status, category, created_at)
            VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, ?)
        `;
        const values = [name, description, instructor_id, date, maximum_capacity, duration, 'scheduled', category, getCurrentDateTime()];

        await pool.query(sql, values);

        return res.status(201).json({ message: "Class created successfully" });
    } catch (error) {
        console.error("Error creating class:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createClass;