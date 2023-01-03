const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a user name"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "please provide a valid E-mail"],
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password don't match",
      },
    },
  },
  {
    timeStamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;

  const hashedPass = bcrypt.hashSync(password);

  this.password = hashedPass;
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.comparePass = function (password, hash) {
  const validCheck = bcrypt.compareSync(password, hash);
  return validCheck;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
