const express = require("express");
const router = express.Router();
const { resticLoginAdmin } = require("../../middlewares/auth");
const { listController } = require("../../controllers/admin/listController");
const { viewEmployeeController } = require("../../controllers/admin/viewEmployee");

// --------------------------------- Manage all changes -------------------------------- //

router.get("/employee-list-page",resticLoginAdmin,listController.getemployeeList);
router.get("/employee-data", resticLoginAdmin,listController.employeeData);

router.get("/view-employee-page/:id",resticLoginAdmin,viewEmployeeController.viewEmployee);
router.post("/view-status-page/:id",resticLoginAdmin,listController.statusEmployee);
router.get("/view-employee-delete/:id",resticLoginAdmin,listController.deleteEmployee);
router.get("/view-employee-update/:id",resticLoginAdmin,listController.getUpdateEmployee);
router.post("/employee-update/:id",resticLoginAdmin,listController.UpdateEmployeeProfile);


module.exports = router;
