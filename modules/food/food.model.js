const { unique } = require("jquery");
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  cover: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const model = mongoose.model("food", schema);

module.exports = model;
