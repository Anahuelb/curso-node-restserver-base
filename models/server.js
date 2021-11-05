const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.userPath = "/api/usuarios";
    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }
  middlewares() {
    // CORS
    this.app.use(cors());
    // Body Parser
    this.app.use(express.json());
    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, require("../routes/user.routes"));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Server on port 8080");
    });
  }
}

module.exports = Server;
