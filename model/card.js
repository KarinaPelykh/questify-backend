const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  category: String,
  status: String,
  date: String,
  quest: String,
});

const Card = model("card", cardSchema);

module.exports = Card;
