const jwt = require("jsonwebtoken");

const generateToken = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateToken,
};
