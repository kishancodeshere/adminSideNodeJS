const uploadModel = require("../../../models/testing");
const fs = require("fs");
const path = require("path");

exports.uploadController = {
  uploadImage: async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    let ori = path.join(__dirname, "../../../public/assets/uploads");
    let userId = req.user.id;
    let imageLoc1 = `${ori}/${req.imageLoc}`;
    let exists = fs.existsSync(imageLoc1);
    if (!exists) {
      return res.json({ Message: "no file exists...." });
    }
    fs.unlinkSync(imageLoc1);

    await uploadModel.findByIdAndUpdate(userId, {
      image: req.file.filename,
    });

    req.flash("success1", "Image upload successfully");

    res.redirect("/testing/profile-page");
  },
};
