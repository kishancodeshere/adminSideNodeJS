const empModel = require("../../models/employee/employeeSchema");
const QueryData = require("../../models/employee/employeeQuery");

exports.listController = {
  getemployeeList: (req, res) => {
    res.render("employe-list", { data: req.user });
  },
  listPage: async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    let a = await QueryData.findQuery({}, { _id: 1 }, skip, limit);
    // console.log(a.length);
    res.send(a);
  },
};
