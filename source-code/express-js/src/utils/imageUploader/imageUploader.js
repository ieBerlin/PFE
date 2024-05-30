const multer = require("multer");

const storage = multer.diskStorage({
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split(".").pop();
        cb(null, `${uniqueSuffix}.${fileExtension}`);
    },

    destination: (_req, file, cb) => {
        cb(null, "public/uploads/images/profile");
    },
});

const upload = multer({
    storage,
});

function storageImage(req, res, next) {
    upload.single("image")(req, res, function(err) {
        console.log(req.file)
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: "Multer error occurred." });
        } else if (err) {
            // console.log(err)
            return res.status(500).json({ error: "Unknown error occurred." });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        req.imageName = req.file.filename;
        next();
    });
}

module.exports = {
    storageImage,
};