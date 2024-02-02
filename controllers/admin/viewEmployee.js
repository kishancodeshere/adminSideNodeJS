const EmpQuery = require("../../models/employee/employeeQuery");

exports.viewEmployeeController = {
  viewEmployee: async (req, res) => {
    let result = await EmpQuery.employeefindOne({ _id: req.params.id });
    res.render("pages/employee/employee-view-page", {
      result,
      data: req.user,
    });
  },
};
