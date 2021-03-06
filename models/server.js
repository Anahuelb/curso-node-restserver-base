const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.userPath = "/api/users";
    this.authPath = "/api/auth";
    //connect to database
    this.connectDb();
    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }
  async connectDb() {
    await dbConection();
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
    this.app.use(this.authPath, require("../routes/auth.routes"));
    this.app.use(this.userPath, require("../routes/user.routes"));
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Server on port 8080");
    });
  }
}

module.exports = Server;
