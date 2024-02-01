const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "photo_" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = function (req, file, cb) {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(extname)) {
    return cb(null, true);
  }
  cb(new Error("Only jpg, jpeg, and png files are allowed."));
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);

module.exports = upload;
