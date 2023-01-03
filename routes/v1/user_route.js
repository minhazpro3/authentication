const express = require("express");
const authenticates = require("../../controllers/user.controllers");
const { authenticate } = require("../../utils/middleware/authenticate");
const router = express.Router();

router.route("/register").post(authenticates.register);
router.route("/login").post(authenticates.login);
router.route("/dashboard").get(authenticate, authenticates.dashboard);

module.exports = router;
