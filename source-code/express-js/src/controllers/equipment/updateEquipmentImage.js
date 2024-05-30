const multer = require("multer");
const { pool } = require("../../models/db/connect");

const storage = multer.diskStorage({
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${uniqueSuffix}.${fileExtension}`);
  },

  destination: (_req, file, cb) => {
    cb(null, "public/uploads/images/equipment");
  },
});

const upload = multer({
  storage,
});

function updateEquipmentImage(req, res, next) {
  upload.single("image")(req, res, async function (err) {
    const equipmentId = req.params?.equipmentId;
    if (!equipmentId) {
      return res.status(400).json({ error: "No equipment provided." });
    }

    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Multer error occurred." });
    } else if (err) {
      // console.log(err)
      return res.status(500).json({ error: "Unknown error occurred." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    await pool.query("UPDATE equipment SET image =? WHERE id = ?", [
      req.file.filename,
      equipmentId,
    ]);

    return res.status(201).json({ message: "done" });
  });
}

module.exports = updateEquipmentImage;
