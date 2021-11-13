const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    throw new Error("error de conexion con base de datos");
  }
};

module.exports = {
  dbConection,
};
