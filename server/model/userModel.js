const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    password: {
      type: "string",

      required: true,
    },
    date: {
      type: "date",
      default: Date.now,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("User", userSchema);
