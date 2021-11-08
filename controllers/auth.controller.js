const { response, request } = require("express");
const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../helpers/generateToken");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    //verify if email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User/password incorrect -em",
      });
    }

    //verify if user is active
    if (!user.status) {
      return res.status(400).json({
        ok: false,
        msg: "User/password incorrect -ac",
      });
    }

    //verify if password is correct bcryptjs
    const validPassword = await bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "User/password incorrect -pw",
      });
    }

    //generate JWT
    const token = await generateToken(user.id);

    res.json({
      message: "Login OK",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  login,
};
