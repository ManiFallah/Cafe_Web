const { validationResult } = require("express-validator");
const contactModel = require("./contact.model");

exports.create = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    result.errors.forEach((error) => {
      req.flash(error.path, error.msg);
    });
    return res.redirect("/contact-us");
  }
  const { name, subject, text, email, phone } = req.body;
  const contact = await contactModel.create({
    name,
    subject,
    text,
    email,
    phone,
  });
  req.flash("success", "پیام شما با موفقیت ثبت شد");
  res.redirect("/contact-us/");
};
exports.getPage = async (req, res) => {
  res.render("contact");
};
