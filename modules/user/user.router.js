const express = require("express");
const userController = require("./user.controller");
const { registerValidator } = require("./user.validator");
const router = express.Router();
router.route("/").get(userController.getAuthPage);
router.route("/register").post(registerValidator, userController.register);
router.route("/login").post(userController.login);

module.exports = router;
