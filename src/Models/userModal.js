const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  rePassword: { type: String, required: true },
});

const userModel = mongoose.model("redwhiteuser", userSchema);

module.exports = userModel;