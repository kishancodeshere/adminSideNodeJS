const Employee = require("./employeeSchema");
const findQuery = async (obj, sortObj, skip, limit) => {
  const data = await Employee.find(obj)
    .sort(sortObj)
    .skip(skip)
    .limit(limit)
    .lean();
   return data;
};

const countEmployee = async (obj) => {
  const data = await Employee.countDocuments(obj);
  
  return data;
};

module.exports = { findQuery, countEmployee };
