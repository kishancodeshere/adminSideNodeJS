const express = require("express");
const router = express.Router();
const { testingController } = require("../../controllers/testing/testing");
const {forgetController} = require("../../controllers/testing/forgetPassword/forget");
const {uploadController} = require("../../controllers/testing/uploadImage/upload");
const {listController}=require("../../controllers/admin/listController");
const { resticLoginAdmin } = require("../../middlewares/auth");

const upload = require("../../utils/profile-image");

// -------------------------------- Manage Admin Creditial -------------------------------- //

router.get("/signin-page", testingController.getSignIn);
router.post("/signin", testingController.signin);

router.get("/signup-page", testingController.getSignUp);
router.post("/signup", testingController.signUp);

router.get("/signout", resticLoginAdmin, testingController.signout);



// --------------------------------- Manage all changes -------------------------------- //


router.get("/index", resticLoginAdmin, testingController.index);
router.get("/profile-page", resticLoginAdmin, testingController.getProfile);

router.get("/change-page",resticLoginAdmin,testingController.changePasswordPage);
router.post("/changePassword",resticLoginAdmin,testingController.changePassword);

router.post("/updateProfile",resticLoginAdmin,testingController.updateProfile);

router.get("/forgot-page", testingController.forgotPage);
router.post("/forgotPassword", testingController.forgetPassword);

router.get("/reset-password-page/:token", forgetController.resetPassword);
router.post("/forget-change-password/:token",forgetController.forgetChangePassword);

router.post("/upload-profile",resticLoginAdmin,upload.single("image"), uploadController.uploadImage);


// --------------------------------- Manage all changes -------------------------------- //

router.post("/employee-list",listController.listPage);
router.get("/employee-list-page",resticLoginAdmin,listController.getemployeeList);



module.exports = router;
