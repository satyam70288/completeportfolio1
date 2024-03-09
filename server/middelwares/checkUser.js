const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

exports.checkUser = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in first",
      });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.clearCookies("token");
    const newToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30s",
      }
    );

    // Set the new token as a cookie
    res.cookie("token", newToken, {
      path: "/",
      httpOnly: true,
      expiresIn: new Date(new Date() + 1000 * 30),
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "user is logged in successfully",
      user,
    });

    // jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    //   if (error) {
    //     return res.status(403).json({
    //       success: false,
    //       message: error.message,
    //     });
    //   }
    // });
  } catch (e) {
    // Handle other errors if needed
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
