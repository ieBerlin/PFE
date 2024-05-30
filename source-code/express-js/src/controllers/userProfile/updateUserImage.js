const { pool } = require("../../models/db/connect");
const { storageImage } = require("../../utils/imageUploader/imageUploader");
const updateUserImage = async(req, res) => {
    const image = req.imageName;
    const userId = req.userId;

    try {
        await pool.query('UPDATE users SET image = ? WHERE userId = ?', [image, userId]);
        res.status(201).json({ message: "Image updated successfully." });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = updateUserImage;