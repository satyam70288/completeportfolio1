const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { connectDb } = require("./connection");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");

connectDb();
// middelware
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Invoke the cookieParser function

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api", routes);

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
