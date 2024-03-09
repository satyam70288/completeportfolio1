const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.MONGO_DB);
  if (connection.STATES.disconnected) {
    console.log("db connection failed");
  } else {
    console.log("db connection established");
  }
};

module.exports = { connectDb };
