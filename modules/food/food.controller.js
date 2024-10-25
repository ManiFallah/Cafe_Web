const { validationResult } = require("express-validator");
const foodModel = require("./food.model");
const categoryModel = require("../category/category.model");
const path = require("path");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = {};
    result.errors.forEach((error) => {
      errors[error.path] = error.msg;
    });
    return res.status(406).json({ errors });
  }
  const { name, price, cover, desc, infos, category } = req.body;
  const uploadedFile = req.files.uploadFile;
  req.files.cover.mv(
    path.join(
      path.dirname(path.dirname(__dirname)),
      "public/images/covers/items",
      req.files.cover.name
    )
  );
  newFood = await foodModel.create({
    name,
    price,
    cover: req.files.cover.name,
    desc,
    infos,
    category,
  });
  if (newFood) {
    return res.json({ msg: "Food Added To Menu" });
  } else {
    return res.status(500).json({ error: "Unkown Error" });
  }
};

exports.update = async (req, res) => {
  const { name, price, cover, desc, infos, category } = req.body;
  let mainFood;
  if (cover) {
    mainFood = await foodModel.findOneAndUpdate(
      { name },
      {
        $set: {
          name,
          price,
          cover,
          desc,
          infos,
          category,
        },
      }
    );
  } else {
    mainFood = await foodModel.findOneAndUpdate(
      { name },
      {
        $set: {
          name,
          price,
          desc,
          infos,
          category,
        },
      }
    );
  }
  if (!mainFood) {
    return res
      .status(404)
      .json({ error: `There is No Food With Name ${name}` });
  }
  res.status(202).json({ msg: "food Updated Successfully" });
};

exports.getAll = async (req, res) => {
  const foods = await foodModel.find({}).lean();
  const nums = foods.length;
  const pageNums =
    foods.length % 2 == 0 ? foods.length / 2 : parseInt(foods.length / 2) + 1;
  res.render("items", {
    foods,
    nums,
  });
};
exports.getOne = async (req, res) => {
  const { item } = req.query;
  if (!isValidObjectId(item)) {
    req.flash("error", "ایتمی با این ایدی وجود ندارد");
    return res.render("/foods/");
  }
  const food = await foodModel.findOne({ _id: item });
  if (!food) {
    req.flash("error", "ایتمی با این ایدی وجود ندارد");
    return res.render("/foods/");
  }
  const category = await categoryModel.findOne({ _id: food.category });
  res.render("item", {
    food,
    category,
  });
};
