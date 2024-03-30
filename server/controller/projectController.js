const Project = require("../model/projectModel");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects) {
      return res.status(404).json({
        success: false,
        message: "Projects not found", // Added the missing closing quote
      });
    }
    // If projects are found, you can proceed with the success response
    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.addProject = async (req, res) => {
  const { name, desc, githubUrl, hostedUrl, secureUrl, publicId, deleteToken } =
    req.body;
  console.log(`adding project ${name}`);
  try {
    if (!name || !desc)
      return res.status(400).json({
        success: false,
        message: "please fill all feilds",
      });

    const newProject = await Project.create({
      name,
      desc,
      githubUrl,
      hostedUrl,
      img: secureUrl,
      publicId,
      deleteToken,
    });
    await newProject.save();
    return res.status(200).json({
      success: true,
      message: "Project created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.removeProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(200).json({
        success: false,
        message: "project not found",
      });
    }

    return res.json({ success: true, message: "project deleted" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    let project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    if (updatedData.img) {
      project.img = updatedData.img;
    }

    for (const key in updatedData) {
      if (key != img) {
        project[key] = updatedData[key];
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
