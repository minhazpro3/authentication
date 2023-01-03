const jwt = require("jsonwebtoken");
const { promisify } = require("util");
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        err: "you are not logged in",
      });
    }
    const decode = await promisify(jwt.verify)(token, process.env.sk_token);

    console.log(decode);

    req.user = decode;
    next();
  } catch (error) {
    res.send({
      message: "authenticate fail",
      err: error.message,
    });
  }
};
