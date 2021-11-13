const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controller");
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

router.post(
  "/google",
  [check("id_token", "token is required").not().isEmpty(), validateFields],
  googleSignIn
);

module.exports = router;
