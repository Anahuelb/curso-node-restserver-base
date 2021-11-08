const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const userGet = async (req = request, res = response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json({
    user,
  });
};

const usersGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };
  const usersPromise = User.find(query).skip(Number(from)).limit(Number(limit));
  const totalPromise = User.countDocuments(query);
  const [total, users] = await Promise.all([totalPromise, usersPromise]);

  res.json({
    message: "get all users - controller",
    total,
    users,
  });
};

const userPost = async (req = request, res = response) => {
  const body = req.body;
  const user = new User(body);
  //encrypt password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(user.password, salt);
  // save on db
  await user.save();
  res.status(201).json({
    user,
  });
};

const userPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...update } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    update.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, update);
  res.json({
    user,
  });
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;
  const userFrom = req.userFrom;
  //phisical delete
  // await User.findByIdAndDelete(id);
  //desactivate user
  const user = await User.findByIdAndUpdate(id, { status: false });
  res.json({
    message: `user ${id} - deleted`,
    user,
    userFrom,
  });
};

module.exports = {
  userGet,
  usersGet,
  userPost,
  userPut,
  userDelete,
};
