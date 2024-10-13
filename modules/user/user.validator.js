const { body } = require("express-validator");

const registerValidator = () => {
  return [
    body("username")
      .isString()
      .notEmpty()
      .withMessage("فیلدی نمیتواند خالی بماند")
      .isLength({ min: 6, max: 16 })
      .withMessage("نام کاربری باید بین 6 تا 16 کاراکتر باشد"),
    body("email")
      .isEmail()
      .withMessage("لطفا یک ایمیل معتبر وارد کنید")
      .notEmpty()
      .withMessage("فیلدی نمیتواند خالی بماند"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("فیلدی نمیتواند خالی بماند")
      .isLength({ min: 8, max: 16 })
      .withMessage("رمز عبور باید بین 8 تا 16 کاراکتر باشد"),
  ];
};

module.exports = { registerValidator };
