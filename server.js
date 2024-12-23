const express = require("express");
const userModel = require("./modules/user/user.model");
require("dotenv").config();
require("./utils/db");
const app = express();
const hbs = require("hbs");
const fileUpload = require("express-fileupload");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRouter = require("./modules/user/user.router");
const newsLetterRouter = require("./modules/newsLetter/newsLetter.router");
const foodRouter = require("./modules/food/food.router");
const catrgoryRouter = require("./modules/category/category.router");
const contactRouter = require("./modules/contact/contact.router");
const commentRouter = require("./modules/comment/comment.router");
const whishlistRouter = require("./modules/whishlist/whishlist.router");
const saleRouter = require("./modules/sale/sale.router");
//Packages
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(
  session({
    secret: "Secret Key",
    saveUninitialized: true,
    resave: true,
  })
);
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")));
app.use(flash());
app.use(cookieParser());
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "حجم فایل باید کمتر از 50 مگابایت باشد",
    debug: false,
  })
);
hbs.registerHelper("ifgt", function (a, b, options) {
  if (a > b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper("iflt", function (a, b, options) {
  if (a < b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper("multiple", function (a, b, options) {
  return a * b;
});
hbs.registerHelper("divide", function (a, b, options) {
  return a / b;
});
//MiddleWares
app.use("/auth", userRouter);
app.use("/news", newsLetterRouter);
app.use("/foods", foodRouter);
app.use("/category", catrgoryRouter);
app.use("/contact-us", contactRouter);
app.use("/comment", commentRouter);
app.use("/whishlist", whishlistRouter);
app.use("/sale", saleRouter);
//Routes

app.listen(process.env.PORT, () => {
  console.log(`Server is Running On Port ${process.env.PORT}`);
});
