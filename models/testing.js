const mongoose = require("mongoose");

const testingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  city: {
    type: String,
  },
  image: {
    type: String,
    default: "demo1.png",
  },
  isProfile: {
    type: Boolean,
    default: false,
  },
  verificationtoken: {
    type: String,
  },
});

const tesingModel = mongoose.model("tesing", testingSchema);
module.exports = tesingModel;
