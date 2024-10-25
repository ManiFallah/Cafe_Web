const whishlistModel = require("./whishlist.model");
const foodModel = require("../food/food.model");
const jwt = require("jsonwebtoken");

exports.addToWhishlist = async (req, res) => {
  if (!req.cookies.accessToken) {
    req.flash("token", "لطفا وارد شوید");
    return res.redirect(req.last);
  }
  const id = jwt.verify(req.cookies.accessToken, process.env.SECRET).id;
  const main = await whishlistModel.findOne({ user: id });
  const { item } = req.body;
  if (main) {
    const exists = main.items.includes(item);
    if (exists) {
      req.flash("whishError", "قبلا به علاقه مندی ها اضافه شده است");
      return res.redirect(`/foods/details?item=${item}`);
    }
    await whishlistModel.findOneAndUpdate(
      { user: id },
      {
        $push: {
          items: item,
        },
      }
    );
  } else {
    await whishlistModel.create({ user: id, items: [item] });
  }
  req.flash("success", "به لیست علاقه مندی ها اضافه شد");
  return res.redirect(`/foods/details?item=${item}`);
};
exports.getWhishlist = async (req, res) => {
  if (!req.cookies.accessToken) {
    req.flash("token", "لطفا وارد شوید");
    return res.redirect("/auth/");
  }
  const id = jwt.verify(req.cookies.accessToken, process.env.SECRET).id;
  const whishlist = await whishlistModel
    .findOne({ user: id })
    .populate({ path: "items" });
  const items = whishlist.items;
  res.render("whishlist", { items });
};
exports.delete = async (req, res) => {
  const { title } = req.body;
  const accessToken = req.cookies.accessToken;
  const id = jwt.decode(accessToken, process.env.SECRET).id;
  const main = await foodModel.findOne({ name: title });
  const whishlist = await whishlistModel.findOneAndUpdate(
    { user: id },
    {
      $pull: {
        items: main._id,
      },
    }
  );
  // whishlist.items.filter((item) => {
  //   item.equals(main._id);
  //   // console.log(item);
  // });
  // await whishlist.save();
  res.json(true);
};
