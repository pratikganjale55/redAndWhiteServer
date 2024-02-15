const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[0];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization denied. No token provided" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Authorization denied. Invalid token" });
  }
};

module.exports = authorize;
