const multer = require("multer");
const { pool } = require("../../models/db/connect");

const storage = multer.diskStorage({
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split(".").pop();
        cb(null, `${uniqueSuffix}.${fileExtension}`);
    },
    destination: (_req, file, cb) => {
        cb(null, "public/uploads/images/certifications");
    },
});

const upload = multer({
    storage,
});

function createCertification(req, res, next) {
    upload.single("image")(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: "Multer error occurred." });
        } else if (err) {
            return res.status(500).json({ error: "Unknown error occurred." });
        }

        let imageFilename = null;
        if (req.file) {
            imageFilename = req.file.filename;
        }
        try {
            const [result] = await pool.query(
                'INSERT INTO certification (image, coachId) VALUES (?, ?)', [imageFilename, req.userId]
            );

            return res.status(201).json({ message: 'Certification created successfully', id: result.insertId });
        } catch (error) {
            console.error('Error creating certification:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}

module.exports = createCertification;