const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { JWT_REFRESH_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Unauthorize"));
  }

  try {
    const { id } = jwt.verify(token, JWT_REFRESH_SECRET);

    const user = await User.findById(id);

    if (!user) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
