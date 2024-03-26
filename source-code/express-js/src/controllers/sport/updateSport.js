// Import necessary modules
const { pool } = require('../../models/db/connect.js');
const getCurrentDateTime = require('../../utils/getCurrentDateTime.js');

// Define the updateSport function
const updateSport = async(req, res) => {
    try {
        // Extract sport details from the request body
        const sportId = parseInt(req.params.sportId);
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
        // Define the SQL query to update the sport
        const sql = 'UPDATE sports SET name = ?, description = ?, updated_at = ? WHERE sportId = ?';
        const values = [name, description, getCurrentDateTime(), sportId];

        // Execute the SQL query
        const [result] = await pool.query(sql, values);

        // Check if the sport was found and updated
        if (result.affectedRows > 0) {
            // Send success response
            return res.status(200).json({ message: 'Sport updated successfully.' });
        } else {
            // Send error response if the sport was not found
            return res.status(404).json({ message: 'Sport not found.' });
        }
    } catch (error) {
        // Handle errors
        console.error('Error updating sport:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Export the updateSport function
module.exports = updateSport;