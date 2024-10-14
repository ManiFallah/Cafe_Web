const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const model = mongoose.model("category", schema);
module.exports = model;
