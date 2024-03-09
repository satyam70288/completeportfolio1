const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skill: {
    type: "string",
    required: true,
  },
  level: {
    type: Number,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
