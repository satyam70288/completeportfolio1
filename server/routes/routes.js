const express = require("express");
const { signUp, login, logout } = require("../controller/AuthController");
const router = express.Router();

//authentication
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
module.exports = router;
