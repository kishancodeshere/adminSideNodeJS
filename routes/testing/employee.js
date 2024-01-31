const express = require("express");
const router = express.Router();
const { resticLoginAdmin } = require("../../middlewares/auth");
const { listController } = require("../../controllers/admin/listController");

// --------------------------------- Manage all changes -------------------------------- //

router.get("/employee-list-page",resticLoginAdmin,listController.getemployeeList);
router.get("/employee-data", resticLoginAdmin,listController.employeeData);

module.exports = router;
