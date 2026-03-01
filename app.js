const express = require("express");
const cors = require("cors");

const app = express();
const userRoute = require("./routes/api/user");

app.use(express.json());

app.use(cors());

app.use("/api/user", userRoute);
//not found page
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

module.exports = app;
