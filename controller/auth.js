const { ctrlWrapper, HttpError, generateToken } = require("../helpers");
const User = require("../model/user");

const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "User already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const { accessToken, refreshToken } = generateToken({ id: newUser._id });

  await User.findByIdAndUpdate(newUser._id, { refreshToken });

  res.status(201).json({
    user: {
      id: newUser._id,
      email: newUser.email,
    },
    accessToken,
    refreshToken,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Unauthorized");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = generateToken({ id: user._id });

  const data = await User.findByIdAndUpdate(user._id, { refreshToken });

  res.status(200).json({
    user: { id: data._id, email: data.email },
    accessToken,
    refreshToken,
  });
};

const signout = async (req, res) => {
  const { _id: owner } = req.user;

  await User.findByIdAndUpdate(owner, { refreshToken: "" });
  res.json({ message: "Signout success" });
};

const refresh = async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  refresh: ctrlWrapper(refresh),
};
