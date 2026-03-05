const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, lowercase: true, require: true },
    email: { type: String, lowercase: true, require: true },
    password: {
      type: String,
      lowercase: true,
      minLength: 6,
      maxLength: 32,
      require: true,
    },
    token: { type: String },
  },
  { versionKey: false, timestamps: true },
);

const User = model("user", userSchema);

module.exports = User;
