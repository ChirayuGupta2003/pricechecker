const mongoose = require("mongoose");

const priceInfo = new mongoose.Schema({
  price: Number,
  date: Date,
});

module.exports = mongoose.model("PriceInfo", priceInfo);
