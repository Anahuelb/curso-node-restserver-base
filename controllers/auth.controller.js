const { response, request } = require("express");
const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../helpers/generateToken");
const { googleVerify } = require("../helpers/google-verify");

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
        msg: "not allowed to login",
      });
    }

    //verify  google account
    if (user.google) {
      return res.status(400).json({
        ok: false,
        msg: "not allowed to login here",
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

//google sign in controllers
const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const googleUser = await googleVerify(id_token);
    // console.log(googleUser);
    const { name, email, picture } = googleUser;
    const user = await userModel.findOne({ email });
    if (!user) {
      const newUser = new userModel({
        name,
        email,
        password: ":)",
        avatar: picture,
        google: true,
      });
      await newUser.save();
      const token = await generateToken(newUser.id);
      res.json({
        message: "Login OK",
        user: newUser,
        token,
      });
    } else {
      const token = await generateToken(user.id);
      res.json({
        message: "Login OK",
        user,
        token,
      });
    }
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
  googleSignIn,
};
