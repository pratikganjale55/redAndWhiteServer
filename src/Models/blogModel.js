const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  category : { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  date: {  type: String}
});

const blogModel = mongoose.model("redwhiteBlog", blogSchema);

module.exports = blogModel;
