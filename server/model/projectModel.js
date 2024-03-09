const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: "string",
    desc: "string",
    img: "url",
    githubUrl: "string",
    hostedUrl: "string",
    publicId: "string",
    deleteToken: "string",
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", ProjectSchema);
