const tesingModel = require("../../models/testing");
const empModel = require("../../models/employee/employeeSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../../utils/mailer");

exports.testingController = {
  getSignIn: (req, res) => {
    const errorMsg = req.flash("error");
    const errorMsg1 = req.flash("error1");
    res.render("login", { errorMsg, errorMsg1 });
  },

  index: async (req, res) => {
    let count = await empModel.find().count();
    res.render("index", { data: req.user, Usercount: count });
  },

  getSignUp: (req, res) => {
    res.render("pages-register");
  },

  signout: (req, res) => {
    try {
      res.cookie("token", "", { expires: new Date(0) });
      res.redirect("/testing/signin-page");
    } catch (error) {
      console.log(error);
    }
  },

  getProfile: async (req, res) => {
    let profile = await tesingModel.find(req.user);
    const updateMsg = req.flash("success");
    const updateImg = req.flash("success1");
    res.render("profile", {
      data: req.user,
      userProfile: profile,
      updateMsg,
      updateImg,
    });
  },
  forgotPage: (req, res) => {
    res.render("forgot");
  },

  signUp: async (req, res) => {
    try {
      const user = await tesingModel.find({ email: req.body.email });
      if (user.length == 1) {
        return res.json({
          success: false,
          error: "This email is alaredy in use,try signin,",
        });
      } else {
        const { name, email, password, city, isProfile } = new tesingModel(
          req.body
        );
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new tesingModel({
          name,
          email,
          password: hashedPassword,
          city,
          isProfile,
        });
        await newUser.save();
        return res.json({
          success: true,
          massage: "User Create SuccessFully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Some Error Occur!" });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await tesingModel.findOne({ email });
      if (!user) {
        req.flash("error", "User not found plesae signup");
        return res.redirect("/testing/signin-page");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        req.flash("error1", "You are enterd worng Password");
        return res.redirect("/testing/signin-page");
      }

      const token = jwt.sign({ id: user._id }, process.env.AdminSecretkey);
      res.cookie("token", token).redirect("/testing/index");
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  },
  updateProfile: async (req, res) => {
    try {
      let userId = req.user.id;
      await tesingModel.findByIdAndUpdate(userId, {
        $set: req.body,
      });
      req.flash("success", "Profile Update Successfully");
      res.redirect("/testing/profile-page");
    } catch (error) {
      console.log(error);
    }
  },
  changePasswordPage: async (req, res) => {
    const error = req.flash("error");
    const error1 = req.flash("error-password");
    const success = req.flash("success");
    res.render("change-password", { data: req.user, error, error1, success });
  },
  changePassword: async (req, res) => {
    try {
      console.log(req.user.password);
      const { oldPassword, newPassword, cnfPassword } = req.body;
      const PasswordMatch = await bcrypt.compare(
        oldPassword,
        req.user.password
      );
      if (!PasswordMatch) {
        req.flash("error", "Old Password is Incorrect ");
        return res.redirect("/testing/change-page");
      }
      if (newPassword != cnfPassword) {
        req.flash("error-password", "Confirm Password Does't Match");
        return res.redirect("/testing/change-page");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await tesingModel.findByIdAndUpdate(req.user.id, {
        $set: { password: hashedPassword },
      });
      res.cookie("token", "", { expires: new Date(0) });
      req.flash("success", "Password change Sucessfully");
      res.redirect("/testing/signin-page");
    } catch (error) {
      console.log("forgetErrror ==>", error);
    }
  },
  forgetPassword: async (req, res) => {
    try {
      let user = await tesingModel.findOne({ email: req.body.email });

      if (!user) {
        return res.redirect("/testing/forgot-page");
      }
      const token = jwt.sign({ _id: user._id }, process.env.AdminSecretkey, {
        expiresIn: "2m",
      });

      sendMail({
        email: user.email,
        subject: "User Verification",
        message: `Click here ${process.env.url}/testing/reset-password-page/${token}`,
      });
      //
      return res.redirect("/testing/signin-page");
    } catch (error) {
      return console.log("forgetPassword ==>", error);
    }
  },
};
