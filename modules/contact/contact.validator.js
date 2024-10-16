const { body } = require("express-validator");

const contactValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("این فیلد نمیتواند خالی باشد")
      .isString()
      .withMessage("نام باید به صورت یک فیلد متنی باشد"),
    body("email")
      .notEmpty()
      .withMessage("این فیلد نمیتواند خالی باشد")
      .isEmail()
      .withMessage("لطفا یک ایمیل معتبر وارد کنید"),
    body("phone")
      .notEmpty()
      .withMessage("این فیلد نمیتواند خالی باشد")
      .isMobilePhone()
      .withMessage("لطفا یک شماره موبایل معتبر وارد کنید"),
    body("subject")
      .notEmpty()
      .withMessage("این فیلد نمیتواند خالی باشد")
      .isString()
      .withMessage("موضوع باید به ضورت یک فیلد متنی باشد"),
    body("text")
      .notEmpty()
      .withMessage("این فیلد نمیتواند خالی باشد")
      .isString()
      .withMessage("پیام باید به صورت متنی باشد"),
  ];
};
module.exports = { contactValidator };
