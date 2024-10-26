const saleModel = require("./sale.model");

exports.goOnSale = async (req, res) => {
  const { food, expireTime, percent } = req.body;
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + Number(expireTime));
  const sale = await saleModel.create({ food, expire_at: expireDate, percent });
  res.json(true);
};
