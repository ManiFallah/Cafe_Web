const { body } = require("express-validator");
const foodModel = require("./food.model");

const foodValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("فیلد نام نمیتواند خالی باشد")
      .isString()
      .withMessage("فیلد نام باید یک متن باشد")
      .custom(async (value) => {
        const exists = await foodModel.findOne({ name: value });
        if (exists) {
          throw new Error("محصول دیگری با این نام وجود دارد");
        } else {
          return true;
        }
      }),
    body("price")
      .notEmpty()
      .withMessage("فیلد قیمت نمیتواند خالی باشد")
      .isInt()
      .withMessage("فیلد قیمت باید به صورت یک عدد صحیح باشد"),
  ];
};
module.exports = { foodValidator };
