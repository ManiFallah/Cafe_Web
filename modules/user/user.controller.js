const userModel = require("./user.model");
const bcrypt = require("bcrypt");
const { escapeSelector } = require("jquery");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  const exists = await userModel.findOne({ $or: [{ username }, { email }] });
  if (exists) {
    req.flash("error", "کاربری با این نام کاربری یا ایمیل وجود دارد");
    return res.redirect("/auth/");
  }
  const role = "USER";
  if (!(await userModel.findOne({}))) {
    role = "ADMIN";
  }
  const user = await new userModel({ username, password, email, role });
  user.save();
  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "30 days",
  });
  res.cookie("accessToken", accessToken, {
    maxAge: "2592000000",
    httpOnly: true,
  });
  res.json({ user });
};

//Register Method

exports.login = async (req, res) => {
  const { rememberMe, password, email } = req.body;
  const exists = await userModel.find({ email });
  if (!exists) {
    req.flash("emailError", "کاربری با این نام کاربری وجود ندارد ");
    return res.redirect("/auth/");
  }
  wrongPass = true;
  //Checking USer Exists
  exists.forEach((user) => {
    const isTruePassword = bcrypt.compareSync(password, user.password);
    if (isTruePassword) {
      wrongPass = false;
      if (rememberMe != "on") {
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
        });
      } else {
        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: "30 days",
        });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: "2592000000",
        });
      }
      return res.json({ msg: "Loggined SuccessFully" });
    }
  });
  //Checking Password
  if (wrongPass) {
    req.flash("passError", "رمز عبور صحیح نمی باشد");
    res.redirect("/auth/");
  }
};

//Login Method

exports.getAuthPage = async (req, res) => {
  res.render("auth");
};
