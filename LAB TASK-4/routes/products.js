
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Route to display the form for adding a new product
router.get("/new", (req, res) => {
  res.render("Products/new");
});

// Route to handle form submission and create a new product
router.post("/new", async (req, res) => {
  const { name, price, description, image } = req.body;
  const product = new Product({
    name: name,
    price: parseFloat(price), // Ensure price is a number
    description: description,
    image: image
  });
  try {
    await product.save();
    res.redirect("/menu");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to delete a product by ID
router.get("/delete/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.redirect("/products");
});

// Route to add a product to the cart by ID
router.get("/add-to-cart/:id", (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  return res.redirect("/cart");
});

// Route to display the form for editing a product by ID
router.get("/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("Products/edit", { product });
});

// Route to handle form submission and update a product by ID
router.post("/edit/:id", async (req, res) => {
  const { name, price, description, image } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    product.name = name;
    product.price = parseInt(price); // Ensure price is a number
    product.description = description;
    product.image = image;
    await product.save();
    res.redirect("/products");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
