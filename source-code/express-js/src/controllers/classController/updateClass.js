const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

const updateClass = async(req, res) => {
    console.log(req.body)
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

        // Combine startDate and startTime, endDate and endTime to form date fields
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        const sql = `
            UPDATE classes 
            SET 
                name = ?,
                description = ?,
                instructor_email = ?,
                startDate = ?,
                startTime = ?,
                endDate = ?,
                endTime = ?,
                maximum_capacity = ?,
                price = ?,
                category = ?,
                updated_at = ?
            WHERE 
                classId = ?;
        `;
        const values = [name, description, instructor_email, startDate, startTime, endDate, endTime, maxSize, price, category, getCurrentDateTime(), req.params.classId];

        await pool.query(sql, values);

        return res.status(200).json({ message: "Class updated successfully" });
    } catch (error) {
        console.error("Error updating class:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = updateClass;