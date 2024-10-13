const express = require("express");
const userModel = require("./modules/user/user.model");
require("dotenv").config();
require("./utils/db");
const app = express();
const hbs = require("hbs");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userRouter = require("./modules/user/user.router");
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
//MiddleWares
app.use("/auth", userRouter);
//Routes

app.listen(process.env.PORT, () => {
  console.log(`Server is Running On Port ${process.env.PORT}`);
});
