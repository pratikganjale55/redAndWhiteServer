const Router = require("express");
const blogRoute = Router();
const blogModel = require("../Models/blogModel");
const authorize = require("../middleware/auth");

blogRoute.get("/", async (req, res) => {
  try {
    const blogs = await blogModel.find();
    return res.status(200).send({ message: "successfully get blog", blogs });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error while fetching blogs", error });
  }
});

blogRoute.get("/userPost/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const blog = await blogModel.find({ userId: id });
    // console.log(blog)
    if (!blog) return res.status(404).send({ message: "Blog not found" });
    return res.status(200).send({ message: "user blog", blog });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error while fetching blog", error });
  }
});

blogRoute.post("/post/:id", authorize, async (req, res) => {
  try {
    const { title, category,description, date } = req.body;
    console.log(date)
    const { id } = req.params;
    if (!title || !category || !description)
      return res.status(422).send({ message: "fill all the details" });
    const blog = new blogModel({ title, category, description, date,userId: id });

    await blog.save();

    return res.status(201).send({ message: "successfully post blog" });
  } catch (error) {
    return res.status(500).send({ message: "error while post blog", error });
  }
});

blogRoute.patch("/edit/:id",authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(id, updateData)
    const updatedBlog = await blogModel.findByIdAndUpdate({_id : id}, updateData, {
      new: true,
    });
    return res.status(200).send(updatedBlog);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error while updating blog", error });
  }
});

blogRoute.delete("/delete/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    await blogModel.findByIdAndDelete({ _id: id });
    return res.status(204).send({ message: "post delete successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error while deleting blog", error });
  }
});
module.exports = blogRoute;
