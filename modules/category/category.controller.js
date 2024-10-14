const { validationResult } = require("express-validator");
const categoryModel = require("./category.model");

exports.addCategory = async (req, res) => {
  const { title } = req.body;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = {};
    result.errors.forEach((error) => {
      errors[error.path] = error.msg;
    });
    return res.status(406).json({ errors });
  }
  if (await categoryModel.findOne({ title })) {
    return res
      .status(406)
      .json({ error: `There is a Category with title ${title}` });
  }
  await categoryModel.create({ title });
  res.status(201).json({ msg: "Category Created Successfully" });
};
exports.updateCategory = async (req, res) => {
  const { pastTitle, title } = req.body;
  const category = await categoryModel.findOneAndUpdate(
    { title: pastTitle },
    { $set: { title } }
  );
  res.status(202).json({ msg: "Category title changed Successfully" });
};
