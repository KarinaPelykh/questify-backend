const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    category: { type: String },
    status: { type: String },
    date: { type: String },
    quest: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "user", require: true },
  },
  { versionKey: false, timestamps: true },
);

const Card = model("card", cardSchema);

module.exports = Card;
