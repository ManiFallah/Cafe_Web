const mongoose = require("mongoose");

const schema = mongoose.Schema({
  food: {
    type: mongoose.Types.ObjectId,
    ref: "food",
    required: true,
  },
  expire_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
});
schema.index(
  { expire_at: (this.expire_at - Date.now()) / 1000 },
  { expireAfterSeconds: 1 }
);
const model = mongoose.model("sale", schema);

module.exports = model;
