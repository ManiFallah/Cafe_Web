const express = require("express");
const contactController = require("./contact.controller");
const { contactValidator } = require("./contact.validator");

const router = express.Router();

router
  .route("/")
  .get(contactController.getPage)
  .post(contactValidator(), contactController.create);

module.exports = router;
