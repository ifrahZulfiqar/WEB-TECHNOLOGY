const express = require("express");
const Product = require("../../models/Product");
const router = express.Router();

// Route to display the form for adding a new product
router.get("/new", (req, res) => {
  res.render("Products/new");
});

// Route to handle form submission and create a new product
router.post("/new", async (req, res) => {
  let product = new Product(req.body);
  await product.save();
  return res.redirect("/products");
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
  return res.redirect("/products");
});

// Route to display the form for editing a product by ID
router.get("/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("Products/edit", { product });
});

// Route to handle form submission and update a product by ID
router.post("/edit/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.image = req.body.image;
  await product.save();
  return res.redirect("/products");
});

// Route to list all products with pagination
router.get("/:page?", async (req, res) => {
  let pageTitle = "List of All Products";
  let page = req.params.page ? parseInt(req.params.page) : 1;
  let pageSize = 3;
  let skip = (page - 1) * pageSize;
  let total = await Product.countDocuments();
  let totalPages = Math.ceil(total / pageSize);
  let products = await Product.find().limit(pageSize).skip(skip);
  return res.render("Products/menu", {
    pageTitle,
    products,
    page,
    pageSize,
    total,
    totalPages,
  });
});

module.exports = router;
