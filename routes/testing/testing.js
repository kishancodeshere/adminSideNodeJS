const express = require("express");
const router = express.Router();
const { testingController } = require("../../controllers/testing/testing");
const {forgetController} = require("../../controllers/testing/forgetPassword/forget");
const {uploadController} = require("../../controllers/testing/uploadImage/upload");
const { resticLoginAdmin } = require("../../middlewares/auth");

const upload = require("../../utils/profile-image");

// ------ Get Testing Apis------- //

router.get("/signin-page", testingController.getSignIn);
router.get("/signup-page", testingController.getSignUp);
router.get("/signout", resticLoginAdmin, testingController.signout);
router.get("/index", resticLoginAdmin, testingController.index);
router.get("/profile-page", resticLoginAdmin, testingController.getProfile);
router.get("/change-page",resticLoginAdmin,testingController.changePasswordPage
);
router.get("/forgot-page", testingController.forgotPage);

// ------Testing Apis------- //

router.post("/signup", testingController.signUp);
router.post("/signin", testingController.signin);
router.post("/updateProfile",resticLoginAdmin,testingController.updateProfile
);
router.post("/changePassword",resticLoginAdmin,testingController.changePassword
);
router.post("/forgotPassword", testingController.forgetPassword);
router.get("/reset-password-page/:token", forgetController.restPassword);
router.post("/forget-change-password/:token",forgetController.forgetChangePassword
);
router.post("/upload-profile",resticLoginAdmin,upload.single("image"), uploadController.uploadImage);

module.exports = router;
