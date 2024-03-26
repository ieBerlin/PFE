const { pool } = require('../../models/db/connect.js');

const updateMembershipPlan = async(req, res) => {
    try {
        const { planId } = req.params;

        if (!planId || isNaN(planId)) {
            return res.status(400).json({ message: 'Invalid planId parameter' });
        }

        const { planName, description, price, duration, features, availabilityStatus } = req.body;

        if (!planName && !description && !price && !duration && !features && !availabilityStatus) {
            return res.status(400).json({ message: 'At least one field must be provided for update' });
        }

        let updateFields = '';
        const updateValues = [];

        if (planName) {
            updateFields += 'planName = ?, ';
            updateValues.push(planName);
        }
        if (description) {
            updateFields += 'description = ?, ';
            updateValues.push(description);
        }
        if (price) {
            updateFields += 'price = ?, ';
            updateValues.push(price);
        }
        if (duration) {
            updateFields += 'duration = ?, ';
            updateValues.push(duration);
        }
        if (features) {
            updateFields += 'features = ?, ';
            updateValues.push(features);
        }
        if (availabilityStatus) {
            updateFields += 'availabilityStatus = ?, ';
            updateValues.push(availabilityStatus);
        }

        updateFields = updateFields.slice(0, -2);

        const [result] = await pool.query(`UPDATE membership SET ${updateFields} WHERE planId = ?`, [...updateValues, planId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Membership plan updated successfully' });
        } else {
            return res.status(404).json({ message: 'Membership plan not found' });
        }
    } catch (error) {
        console.error('Error updating membership plan:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = updateMembershipPlan;