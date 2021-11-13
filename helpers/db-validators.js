const Role = require("../models/role.model");
const User = require("../models/user.model");

const validRoleValidation = async (value) => {
  const existRole = await Role.findOne({ role: value });
  if (!existRole) {
    throw new Error(`${value} is not a valid role`);
  }
};

//verify email
const uniqueEmailValidation = async (value) => {
  const existEmail = await User.findOne({ email: value });
  if (existEmail) {
    throw new Error(`${value} already exist`);
  }
};

// verify Id exist
const existUserIdValidation = async (id) => {
  const existId = await User.findById(id);
  if (!existId) {
    throw new Error(`${id} is not a valid id`);
  }
};

module.exports = {
  validRoleValidation,
  uniqueEmailValidation,
  existUserIdValidation,
};
