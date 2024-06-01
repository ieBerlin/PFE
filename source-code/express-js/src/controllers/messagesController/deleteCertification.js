const { pool } = require('../../models/db/connect');

async function deleteCertification(req, res) {
    const certificationId = req.params.certificationId;

    if (!certificationId) {
        return res.status(400).json({ error: "No certification ID provided." });
    }

    try {
        const [result] = await pool.query('DELETE FROM certification WHERE id = ?', [certificationId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Certification not found." });
        }

        return res.status(200).json({ message: "Certification deleted successfully" });
    } catch (error) {
        console.error('Error deleting certification:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = deleteCertification;