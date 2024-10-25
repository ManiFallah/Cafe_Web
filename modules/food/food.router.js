const express = require("express");
const foodController = require("./food.controller");
const { foodValidator } = require("./food.validator");
const fileUpload = require("express-fileupload");

const router = express.Router();

router
  .route("/")
  .post(foodValidator(), foodController.create)
  .get(foodController.getAll)
  .put(foodController.update);
router.route("/details").get(foodController.getOne);
module.exports = router;
