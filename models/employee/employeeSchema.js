const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  designation: {
    type: String,
  },
  salary: {
    type: Number,
  },
});

const empModel = mongoose.model("employee", employeeSchema);

module.exports = empModel;
