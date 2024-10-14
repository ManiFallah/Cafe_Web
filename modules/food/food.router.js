const express = require("express");
const foodController = require("./food.controller");
const { foodValidator } = require("./food.validator");

const router = express.Router();

router
  .route("/")
  .post(foodValidator(), foodController.create)
  .get(foodController.getAll)
  .put(foodController.update);
module.exports = router;
