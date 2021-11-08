const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, "Role is required"],
    unique: true,
  },
});

module.exports = model("Role", RoleSchema);
