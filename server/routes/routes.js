const express = require("express");
const { signUp, login, logout } = require("../controller/AuthController");
const { getUser, authUser } = require("../controller/userController");
const { verifyToken } = require("../middelwares/verifyToken");
const { refreshToken } = require("../middelwares/refreshToken");
const { checkUser } = require("../middelwares/checkUser");
const {
  getSkills,
  addSkills,
  removeSkills,
} = require("../controller/skillController");
const {
  getProjects,
  addProject,
  removeProject,
  updateProject,
} = require("../controller/projectController");
const router = express.Router();

//authentication
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

//user
router.get("/getuser", getUser);
router.get("/authuser", verifyToken, authUser);
router.get("/refresh", refreshToken, verifyToken, authUser);
router.get("/checkuser", checkUser);

//skill routes
router.get("/getSkills", getSkills);
router.post("/addSkill", addSkills);
router.delete("/deleteSkill/:id", removeSkills);

//project
router.get("/getproject", getProjects);
router.post("/addProject", addProject);
router.delete("/deleteProject", removeProject);
router.get("/updateProject", updateProject);

module.exports = router;
