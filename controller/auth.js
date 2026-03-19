const { ctrlWrapper, HttpError, generateToken } = require("../helpers");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_REFRESH_SECRET } = process.env;

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

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    user: {
      id: newUser._id,
      email: newUser.email,
    },
    accessToken,
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

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    user: { id: data._id, email: data.email },
    accessToken,
  });
};

const signout = async (req, res) => {
  const { _id: owner } = req.user;

  await User.findByIdAndUpdate(owner, { refreshToken: "" });
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ message: "Signout success" });
};

const current = async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

const refresh = async (req, res) => {
  const { refresh_token = "" } = req.cookies;

  if (!refresh_token) {
    throw HttpError(401, "No refresh token provided");
  }
  const { id } = jwt.verify(refresh_token, JWT_REFRESH_SECRET);

  const user = await User.findById(id);

  if (!user || refresh_token !== user.refreshToken) {
    throw HttpError(401, "Unauthorized");
  }

  const { accessToken, refreshToken } = generateToken({ id: user._id });

  await User.findByIdAndUpdate(id, { refreshToken });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
  refresh: ctrlWrapper(refresh),
};
