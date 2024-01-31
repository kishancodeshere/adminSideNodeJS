// const empModel = require("../../models/employee/employeeSchema");
const QueryData = require("../../models/employee/employeeQuery");

exports.listController = {
  getemployeeList: async (req, res) => {
    res.render("employe-list", { data: req.user });
  },
  employeeData: async (req, res) => {
    console.log(req.query);
    console.log(typeof req.query.search.value.trim());
    let skip = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.length) || 10;
    const search = req.query.search.value;
    let regex = new RegExp(search, "i");

    let emp = await QueryData.findQuery(
      {
        $or: [
          { name: regex },
          { city: regex },
          { email: regex },
          { designation: regex },
          // { salary: regex },
        ],
      },
      {},
      skip,
      limit
    );

    let recordTotal = await QueryData.countEmployee({
      $or: [
        { name: regex },
        { city: regex },
        { email: regex },
        { designation: regex },
        // { salary: regex },
      ],
    });
    res.json({ data: emp, recordTotal, recordsFiltered: recordTotal });
  },
};
