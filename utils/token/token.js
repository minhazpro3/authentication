const jwt = require("jsonwebtoken");
exports.generateToken = (info) => {
  const payload = {
    email: info.email,
  };

  const token = jwt.sign(payload, process.env.sk_token, {
    expiresIn: "120s",
  });

  return token;
};
