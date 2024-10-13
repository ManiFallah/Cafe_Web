const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

//User Model Schema

schema.pre("save", async function (next) {
  console.log(this);
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  next();
});

//Hashing User Password

const model = mongoose.model("user", schema);
module.exports = model;

//Exporting Model
