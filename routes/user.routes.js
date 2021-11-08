const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  userPost,
  userPut,
  userDelete,
  userGet,
} = require("../controllers/user.controller");

const {
  validateFields,
  validateJwt,
  OnlyAdminRole,
  isInRole,
  OnlyAdminRoleOrOwner,
} = require("../middlewares");

const {
  uniqueEmailValidation,
  validRoleValidation,
  existUserIdValidation,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGet);

router.get(
  "/:id",
  [
    check("id", "No es un Id valido").isMongoId(),
    check("id").custom(existUserIdValidation),
    validateFields,
  ],
  userGet
);

router.post(
  "/",
  [
    check("email", "email not valid").isEmail(),
    check("email").custom(uniqueEmailValidation),
    check("name", "name cannot be empty").not().isEmpty(),
    check("password", "password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("role").custom(validRoleValidation),
    validateFields,
  ],
  userPost
);

router.put(
  "/:id",
  [
    validateJwt,
    // isInRole("ADMIN_ROLE", "USER_ROLE"),
    OnlyAdminRoleOrOwner,
    check("id", "No es un Id valido").isMongoId(),
    check("id").custom(existUserIdValidation),
    check("role").custom(validRoleValidation),
    validateFields,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    validateJwt,
    OnlyAdminRole,
    check("id", "No es un Id valido").isMongoId(),
    check("id").custom(existUserIdValidation),
    validateFields,
  ],
  userDelete
);

module.exports = router;
