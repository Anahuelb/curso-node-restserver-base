const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "the email is required").isEmail(),
    check("password", "the password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
