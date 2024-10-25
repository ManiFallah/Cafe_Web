const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  items: [
    {
      type: mongoose.Types.ObjectId,
      ref: "food",
      required: true,
    },
  ],
});

schema.pre("save", () => {
  if (!this.items) {
    this.items = [];
  }
});

const model = mongoose.model("whishlist", schema);

module.exports = model;
