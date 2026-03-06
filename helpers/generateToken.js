const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

module.exports = generateToken;
