const express = require("express");
const newsLetterController = require("./newsLetter.controller");
const { body } = require("express-validator");
const router = express.Router();

router
  .route("/")
  .post(
    body("email").notEmpty().withMessage("این فیلد نمیتواند خالی باشد"),
    newsLetterController.join
  );
module.exports = router;
