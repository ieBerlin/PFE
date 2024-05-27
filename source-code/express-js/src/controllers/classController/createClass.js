const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const createClass = async(req, res) => {
    try {
        const { name, description, instructorId, startDate, startTime, endDate, endTime, maxSize, price, category } = req.body;
        let errors = {};

        if (!name) errors.name = "No provided name.";
        if (!description) errors.description = "No provided description.";
        if (!instructorId) errors.instructorId = "No provided instructor id.";
        if (!startDate || !startTime) errors.startDateTime = "No provided start date or time.";
        if (!endDate || !endTime) errors.endDateTime = "No provided end date or time.";
        if (!maxSize) errors.maxSize = "No provided maximum capacity.";
        if (!price) errors.price = "No provided price.";
        if (!category) errors.category = "No provided category.";

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        // const [result] = await pool.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM users WHERE userId = ?', [instructorId]);
        // if (!result.length) {
        //     return res.status(404).json({ instructorId: "Instructor not found." });
        // }

        // const instructorName = result[0].name;

        const sql = `
            INSERT INTO classes (name, description, instructorId, startDate, startTime, endDate, endTime, maximum_capacity, current_enrollment_count, price, category, created_at)
            VALUES (?, ?, ?,  ?, ?, ?, ?, ?, 0, ?, ?, ?)
        `;
        const values = [name, description, instructorId, startDate, startTime, endDate, endTime, maxSize, price, category, getCurrentDateTime()];

        await pool.query(sql, values);

        return res.status(201).json({ message: "Class created successfully" });
    } catch (error) {
        console.error("Error creating class:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createClass;