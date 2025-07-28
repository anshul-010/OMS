const express = require("express");
const { ProductModel } = require("../models/ProductModal");

const router = express.Router();

router.post("/add-products", async (req, res) => {
  try {
    // for an array of objects
    // const allProducts = req.body;
    // await ProductModel.insertMany(allProducts);

    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(200).send({ msg: "product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    res.status(200).send(allProducts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "Failed to fetch products", error: error.message });
  }
});

module.exports = router; // 👈 just export the router directly
