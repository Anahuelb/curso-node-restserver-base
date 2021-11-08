const FieldsValidation = require("../middlewares/validate-fields");
const JstValidation = require("../middlewares/validate-jwt");
const RoleValidation = require("../middlewares/validate-role");

module.exports = {
  ...FieldsValidation,
  ...JstValidation,
  ...RoleValidation,
};
