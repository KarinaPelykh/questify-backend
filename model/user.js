const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const userSchema = new Schema(
  {
    name: { type: String, lowercase: true, require: true },
    email: { type: String, lowercase: true, require: true, unique: true },
    password: {
      type: String,

      minlength: 6,

      require: true,
    },
    refreshToken: { type: String },
  },
  { versionKey: false, timestamps: true },
);

const User = model("user", userSchema);

userSchema.post("save", handleMongooseError);

module.exports = User;
