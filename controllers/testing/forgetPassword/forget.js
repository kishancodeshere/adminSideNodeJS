const tesingModel = require("../../../models/testing");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.forgetController = {
  restPassword: (req, res) => {
    const token = req.params.token;
    res.render("reset", { data: token });
  },
  forgetChangePassword: async (req, res) => {
    try {
      const token = req.params.token;
      const { Password, cnfPassword } = req.body;
      console.log(Password, cnfPassword);
      if (!token) {
        return res.redirect(
          `/testing/forget-change-password/${req.params.token}`
        );
      }
      const decodedata = jwt.verify(token, process.env.AdminSecretkey);
      console.log(decodedata);
      const user = await tesingModel.findOne({ _id: decodedata._id });
      console.log(user);
      if (!user) {
        return res.redirect(`/forget-change-password/${req.params.token}`);
      }
      if (Password != cnfPassword) {
        return console.log("Password Not match");
      }
      const hashedPassword = await bcrypt.hash(Password, 10);

      await tesingModel.findByIdAndUpdate(user._id, {
        $set: { password: hashedPassword },
      });

      res.redirect("/testing/signin-page");
    } catch (error) {
      return res.redirect(`/forget-change-password/${req.params.token}`);
    }
  },
};
