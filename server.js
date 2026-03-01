const app = require("./app");
const mongoose = require("mongoose");
const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
