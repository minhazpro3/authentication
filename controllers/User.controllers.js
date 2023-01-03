const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/token/token");
exports.register = async (req, res) => {
  try {
    const result = await User.create(req.body);
    if (result) {
      res.status(200).json({
        status: "Register success",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "register fail",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        status: "fail",
        err: "provide correct input",
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        err: "No user found ",
      });
    }

    const valid = user.comparePass(password, user.password);
    if (!valid) {
      return res.status(401).json({
        status: "fail",
        error: "email or password invalid",
      });
    }

    const token = generateToken(user);
    console.log(token);

    const { pass, ...others } = user.toObject();

    if (token) {
      res.status(200).json({
        status: "success",

        message: "successfully logged in",
        data: {
          user: others,
          token,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "register fail go",
      error: error,
    });
  }
};

exports.dashboard = async (req, res) => {
  const result = await User.findOne({ email: req.user?.email }).select(
    "-password"
  );
  res.send({
    status: "success",
    data: result,
  });
};
