const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

const userRoute = require("./routes/api/user");

const cardRoute = require("./routes/api/card");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", userRoute);
app.use("/api/card", cardRoute);

//not found page
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((error, req, res, next) => {
  const { status = 500, message } = error;
  res.status(status).json({ message });
});

module.exports = app;
