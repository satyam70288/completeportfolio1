const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.verifyToken = (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token)
      return res.status(401).json({
        success: false,
        message: "please login to access this resource",
      });

    const user = jwt.verify(token, process.env.JWT_SECRET);

    request.id = user.id;

    //
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "invalid token or token expired",
    });
  }
};

module.exports = { verifyToken };
