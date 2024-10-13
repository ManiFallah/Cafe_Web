const express = require("express");
const userController = require("./user.controller");
const router = express.Router();

router.route("/").get(userController.getAuthPage);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;
