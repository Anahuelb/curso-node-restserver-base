const { response, request } = require("express");

const OnlyAdminRole = async (req = request, res = response, next) => {
  if (req.userFrom.role === "ADMIN_ROLE") {
    next();
  } else {
    res.status(403).send("Access denied");
  }
};

const OnlyAdminRoleOrOwner = async (req = request, res = response, next) => {
  console.log(req.params.id);
  if (req.userFrom.role === "ADMIN_ROLE" || req.userFrom.id === req.params.id) {
    next();
  } else {
    res.status(403).send("Access denied");
  }
};

const isInRole = (...roles) => {
  return (req, res, next) => {
    if (!req.userFrom) {
      return res.status(500).json("must verify token first");
    }

    if (roles.includes(req.userFrom.role)) {
      next();
    } else {
      res.status(403).send("Access denied");
    }
  };
};

module.exports = { OnlyAdminRole, isInRole, OnlyAdminRoleOrOwner };
