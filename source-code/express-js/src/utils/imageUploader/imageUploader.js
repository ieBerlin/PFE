const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop(); // Extract file extension
    cb(null, `../uploads/images/users/member/${uniqueSuffix}.${fileExtension}`);
  },

  destination: (req, file, cb) => {
    cb(null, "src/");
  },
});
const upload = multer({
  storage,
});

function storageImage(req, res, next) {
  upload.single("image")(req, res, next);
}

module.exports = {
  storageImage,
};
