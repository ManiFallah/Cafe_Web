const { validationResult } = require("express-validator");
const newsLetterModel = require("./newsLetter.model");

exports.join = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    req.flash(result.errors[0].path, result.errors[0].msg);
    return res.redirect("/auth/");
  }
  const { email } = req.body;
  if (await newsLetterModel.findOne({ email })) {
    req.flash("joinedBefore", "قبلا با این ایمیل عضو شده اید");
    return res.redirect("/auth/");
  }
  const newsLetter = await newsLetterModel.create({ email });
  req.flash("joinSuccess", "با موفقیت عضو خبرنامه شدید");
  res.redirect("/auth/");
};
