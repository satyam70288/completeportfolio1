const User = require("../model/userModel");

exports.getUser = (req, res) => {
  try {
    const user = User.findOne().select("-password -email");
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "user not found" });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
