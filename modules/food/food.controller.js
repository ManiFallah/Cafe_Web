const { validationResult } = require("express-validator");
const foodModel = require("./food.model");

exports.create = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = {};
    result.errors.forEach((error) => {
      errors[error.path] = error.msg;
    });
    return res.status(406).json({ errors });
  }
  const { name, price, cover } = req.body;
  let newFood;
  if (cover) {
    newFood = await foodModel.create({ name, price, cover });
  } else {
    newFood = await foodModel.create({ name, price });
  }
  if (newFood) {
    return res.json({ msg: "Food Added To Menu" });
  } else {
    return res.status(500).json({ error: "Unkown Error" });
  }
};

exports.update = async (req, res) => {
  const { name, price, cover } = req.body;
  let mainFood;
  if (cover) {
    mainFood = await foodModel.findOneAndUpdate(
      { name },
      {
        $set: {
          name,
          price,
          cover,
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
