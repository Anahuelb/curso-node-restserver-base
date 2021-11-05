const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const queryParams = req.query;
  res.json({
    message: "get mundo - controller",
    queryParams,
  });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.status(201).json({
    message: "post mundo - controller",
    nombre,
    edad,
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    message: `put mundo ${id} - controller`,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    message: "delete mundo - controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
