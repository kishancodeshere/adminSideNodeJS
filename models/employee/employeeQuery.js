const Employee = require("./employeeSchema");
const findQuery = async (obj, sortObj, skip, limit) => {
  const data = await Employee.find(obj).sort(sortObj).skip(skip).limit(limit);
  return data;
};

module.exports = { findQuery };
