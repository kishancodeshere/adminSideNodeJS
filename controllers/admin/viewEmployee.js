const EmpQuery = require("../../models/employee/employeeQuery");

exports.viewEmployeeController = {
  viewemployee: async (req, res) => {
    let result = await EmpQuery.employeefindOne({ _id: req.params.id });
    res.render("employee-view-page", { result, data: req.user });
  },
};
