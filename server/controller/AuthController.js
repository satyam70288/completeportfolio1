const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signUP
exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user;
    user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "user already exists" });

    //hasshing password

    const securePassword = await bcrypt.hash(password, 10);

    //creating user
    user = await User.create({
      name,
      email,
      password: securePassword,
    });

    // save user in databse
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "please sign again",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(404)
        .json({ success: false, msg: "inavalide cedential" });
    }

    // token exist or not
    const existingToken = req.cookie.token;
    if (existingToken) {
      res.clearCookie("token");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "100s",
    });
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 30),
      sameSite: "lax",
    });
  } catch (err) {}
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ success: true, msg: "logout successful" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
