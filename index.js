const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./src/Connection/db");
const userRoute = require("./src/Routes/userRoute");
const blogRoute = require("./src/Routes/blogsRoute");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.get("/", (req, res) => {
  res.status(200).send({ message: "welcome to our website" });
});
 
app.listen(process.env.PORT || 8080, async () => {
  await connection;
  console.log(`server start at ${process.env.PORT}`);
});
