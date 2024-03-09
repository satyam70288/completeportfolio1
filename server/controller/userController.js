const User = require("../model/userModel");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");
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

exports.authUser = async (req, res) => {
  const userId = req.id;
  try {
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in the request.",
      });
    }

    // Check if the user exists in the database
    const user = await User.findById(userId, "-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Additional conditions or checks can be added here

    // Return user information
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
