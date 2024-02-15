const Router = require("express");
const authRoute = Router();
const userModel = require("../Models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRoute.post("/signup", async (req, res) => {
  try {
    const { name, password, rePassword } = req.body;
    const existingUser = await userModel.findOne({ name });

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!name) {
      return res.send({ message: "enter user name" });
    }
    if (existingUser) {
      return res.send({ message: "user already registered" });
    }
    if (password !== rePassword) {
      return res
        .send({ message: "Please make sure your passwords match." });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).send({
        message:
          "Password must contain at least 8 characters, including at least 1 number, 1 lowercase letter, and 1 uppercase letter.",
      });
    }

    const salt = await bcrypt.genSaltSync(10);
    const Pass = await bcrypt.hash(password, salt);
    const rePass = await bcrypt.hash(rePassword, salt);

    const user = new userModel({
      ...req.body,
      password: Pass,
      rePassword: rePass,
    });

    await user.save();

    return res.status(201).send({ message: "successfully registered" });
  } catch (error) {
    return res.status(500).send({ message: "error occurs while registered" });
  }
});

authRoute.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const validUser = await userModel.findOne({ name });

  if (!name || !password) {
    return res.send({ message: "fill all the details" });
  }

  if (!validUser) {
    return res.send({ message: "Invalid Credentials" });
  }
  const isMatch = await bcrypt.compare(password, validUser.password);

  if (!isMatch) {
    return res.send({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    {
      name: validUser.name,
    },
    process.env.JWT_KEY
  );
  res.status(201).send({
    message: "Login successful",
    token,
    userDetails: {
      userName: validUser.name,
      id: validUser._id,
    },
  });
});
module.exports = authRoute;
