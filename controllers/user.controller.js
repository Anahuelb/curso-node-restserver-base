const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  const queryParams = req.query;
  res.json({
    message: "get world - controller",
    queryParams,
  });
};

const userPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.status(201).json({
    message: "post world - controller",
    nombre,
    edad,
  });
};

const userPut = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    message: `put world ${id} - controller`,
  });
};

const userDelete = (req, res = response) => {
  res.json({
    message: "delete world - controller",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
