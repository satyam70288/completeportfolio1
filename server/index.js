const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { connectDb } = require("./connection");

connectDb();
// middelware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
