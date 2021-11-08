const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  avatar: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png",
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["USER_ROLE", "ADMIN_ROLE"],
    default: "USER_ROLE",
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  let userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};
module.exports = model("User", UserSchema);
