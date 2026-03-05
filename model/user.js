const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, lowercase: true, require: true },
    email: { type: String, lowercase: true, require: true },
    password: {
      type: String,
      lowercase: true,
      minlength: 6,

      require: true,
    },
    refreshToken: { type: String },
  },
  { versionKey: false, timestamps: true },
);

const User = model("user", userSchema);

module.exports = User;
