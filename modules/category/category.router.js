const express = require("express");
const categoryController = require("./category.controller");
const { body } = require("express-validator");

const router = express.Router();

router
  .route("/")
  .post(
    body("title")
      .notEmpty()
      .withMessage("فیلد نمیتواند خالی باشد")
      .isString()
      .withMessage("فیلد باید به صورت متن باشد"),
    categoryController.addCategory
  )
  .put(categoryController.updateCategory);

module.exports = router;
