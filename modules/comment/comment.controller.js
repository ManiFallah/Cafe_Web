const commentModel = require("./comment.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.comment = async (req, res) => {
  if (!req.cookies.accessToken) {
    req.flash("token", "لطفا وارد شوید");
    return res.redirect(req.last);
  }
  const id = jwt.verify(req.cookies.accessToken, process.env.SECRET).id;
  const { text } = req.body;
  const { category, item } = req.query;
  const comment = await commentModel.create({ user: id, text, category, item });
  if (item) {
    req.flash("success", "نظر شما با موفقیت ثبت شد");
    return res.redirect(`/foods/details/?item=${item}`);
  }
  req.flash("success", "نظر شما با موفقیت ثبت شد");
  res.redirect("/auth/");
};
