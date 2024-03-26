// Import necessary modules
const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

// Define the createSport function
const createSport = async(req, res) => {
    try {
        // Extract sport details from the request body
        const { name, description } = req.body;
        let errors = {};

        if (!name) {
            errors.name = "No provided name.";
        }
        if (!description) {
            errors.description = "No provided description.";
        }

        if (Object.keys(errors).length) {
            return res.status(400).json(errors);
        }

        // Define the SQL query to insert a new sport
        const sql = 'INSERT INTO sports (name, description, created_at) VALUES (?, ?, ?)';
        const values = [name, description, getCurrentDateTime()];

        // Execute the SQL query
        await pool.query(sql, values);

        // Send success response
        return res.status(201).json({ message: 'Sport created successfully.' });
    } catch (error) {
        // Handle errors
        console.error('Error creating sport:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Export the createSport function
module.exports = createSport;