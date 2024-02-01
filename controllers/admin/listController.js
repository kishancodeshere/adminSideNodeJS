const empModel = require("../../models/employee/employeeSchema");
const QueryData = require("../../models/employee/employeeQuery");

exports.listController = {
  getemployeeList: async (req, res) => {
    res.render("employe-list", { data: req.user });
  },
  employeeData: async (req, res) => {
    let skip = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.length) || 10;
    const search = req.query.search.value.trim();
    let regex = new RegExp(search, "i");
    let emp;

    if (search == "") {
      emp = await QueryData.findQuery(
        {
          $or: [
            { name: regex },
            { city: regex },
            { email: regex },
            { designation: regex },
          ],
        },
        {},
        skip,
        limit
      );
    } else if (!isNaN(search)) {
      emp = await QueryData.findQuery(
        { salary: req.query.search.value },

        {},
        skip,
        limit
      );
    } else {
      emp = await QueryData.findQuery(
        {
          $or: [
            { name: regex },
            { city: regex },
            { email: regex },
            { designation: regex },
          ],
        },
        {},
        skip,
        limit
      );
    }

    recordsTotal = await QueryData.countEmployee({
      $or: [
        { name: regex },
        { city: regex },
        { email: regex },
        { designation: regex },
      ],
    });

    res.json({
      data: emp,
      recordsTotal,
      recordsFiltered: recordsTotal,
    });
  },

  statusemployee: async (req, res) => {
    let data = await empModel.findById({ _id: req.params.id });
    if (data.status == "active") {
      data.status = "inactive";
    } else {
      data.status = "active";
    }
    await data.save();

    res.json({ data });
  },
};
