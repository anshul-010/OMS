const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    img: String,
    price: Number,
    title: String,
    name: String,
  },
  {
    versionKey: false,
  }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
