const express = require("express");
const { signUp, login, logout } = require("../controller/AuthController");
const { getUser, authUser } = require("../controller/userController");
const { verifyToken } = require("../middelwares/verifyToken");
const { refreshToken } = require("../middelwares/refreshToken");
const router = express.Router();

//authentication
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

//user
router.get("/getuser", getUser);
router.get("/authuser", verifyToken, authUser);
router.get("/refresh", refreshToken, verifyToken, authUser);
module.exports = router;
