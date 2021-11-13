const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJwt = async (req = request, res = response, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Invalid token",
          error: err,
        });
      } else {
        const { uid } = decoded;
        const userFrom = await User.findById(uid);
        // verify if userFrom is status true
        if (!userFrom || !userFrom.status) {
          res.status(401).json({
            message: "the user is not allowed to action or does not exist",
          });
        }

        req.userFrom = userFrom;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "No token provided",
    });
  }
};

module.exports = { validateJwt };
