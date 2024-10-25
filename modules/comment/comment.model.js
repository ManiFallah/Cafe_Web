const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["food", "article"],
  },
  item: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "food",
  },
  text: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("comment", schema);
module.exports = model;
