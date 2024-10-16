const { validationResult } = require("express-validator");
const foodModel = require("./food.model");
const path = require("path");

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
      "public/covers",
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
  return res.json({ foods });
};
