const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new CustomAPIError("You are not authenticated!", 401);
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) throw new CustomAPIError(403, "Token is not valid!");
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      throw new CustomAPIError("You are not authorized!", 403);
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new CustomAPIError("You are not authorized!", 403);
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
