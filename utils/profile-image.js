const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  // destination: (req, file, callback) => {
  //   callback(null, "");
  // },
  destination: path.join(__dirname, "../public/assets/uploads"),
  filename: (req, file, callback) => {
    callback(null, Date.now() + "Img" + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
