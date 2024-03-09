const Skill = require("../model/skillModel");

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    if (!skills) {
      return res.status(404).json({
        success: false,
        message: "skills not found",
      });
    }
    return res.status(200).json({
      success: true,
      skills,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.addSkills = async () => {
  const { skill, level } = req.body;

  try {
    const newSkills = await Skill.create({ skill, level });
    await newSkills.save();
    return res.status(200).json({
      success: true,
      message: "Skills saved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.removeSkills = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill)
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
