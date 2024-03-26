const { pool } = require('../../models/db/connect.js');

const deleteMembershipPlan = async(req, res) => {
    try {
        const { planId } = req.params;

        if (!planId || isNaN(planId)) {
            return res.status(400).json({ message: 'Invalid planId parameter' });
        }

        const result = await pool.query('DELETE FROM membership WHERE planId = ?', [planId]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Membership plan deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Membership plan not found' });
        }
    } catch (error) {
        console.error('Error deleting membership plan:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = deleteMembershipPlan;