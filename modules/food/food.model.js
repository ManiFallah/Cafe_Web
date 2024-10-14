const mongoose = require("mongoose");

const schema = mongoose.Schema({
  cover: {
    type: String,
    required: true,
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
  desc: {
    type: String,
    required: false,
    minLength: 20,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: true,
  },
  infos: [
    {
      title: {
        type: String,
        required: true,
      },
      info: {
        type: String,
        required: true,
      },
    },
  ],
});

const model = mongoose.model("food", schema);

module.exports = model;
