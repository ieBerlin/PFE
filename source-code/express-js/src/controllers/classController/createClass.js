const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const createClass = async(req, res) => {
    try {
        const { name, description, instructorEmail: instructor_email, startDate, startTime, endDate, endTime, maxSize, price, category } = req.body;
        let errors = {};

        if (!name) {
            errors.name = "No provided name.";
        }
        if (!description) {
            errors.description = "No provided description.";
        }
        if (!instructor_email) {
            errors.instructor_email = "No provided instructor email.";
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
        const [result] = await pool.query('SELECT  CONCAT(first_name, " ", last_name) as name from users where email = ?', [instructor_email]);

        const instructor_name = result[0].name

        // Combine startDate and startTime, endDate and endTime to form date fields
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        const sql = `
            INSERT INTO classes (name, description, instructor_email,instructor_name, startDate, startTime, endDate, endTime, maximum_capacity, current_enrollment_count, price, category, created_at)
            VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, 0, ?, ?, ?)
        `;
        const values = [name, description, instructor_email, instructor_name, startDate, startTime, endDate, endTime, maxSize, price, category, getCurrentDateTime()];

        await pool.query(sql, values);

        return res.status(201).json({ message: "Class created successfully" });
    } catch (error) {
        console.error("Error creating class:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = createClass;