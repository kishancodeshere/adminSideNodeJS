const jwt = require("jsonwebtoken");
const testingModel = require("../models/testing");
const resticLoginAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.params.token || req.query.token;

    if (!token) {
      return res.redirect("/testing/signin-page");
    }
    const decodedata = jwt.verify(token, process.env.AdminSecretkey);

    const user = await testingModel.findOne({ _id: decodedata.id });

    if (!user) {
      return res.redirect("/testing/signin-page");
    }
    req.token = token;
    req.imageLoc = user.image;
    user.image = `${process.env.url}/assets/uploads/${user.image}`;
    req.user = user;
    next();
  } catch (error) {
    console.log("Token error", error);
  }
};

module.exports = {
  resticLoginAdmin,
};
