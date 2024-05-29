

const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get('new/:id', async (req, res) => {
  try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      
      if (!product) {
          return res.status(404).send('Product not found');
      }

      // Add visited product ID to session
      req.session.visitedProducts = req.session.visitedProducts || [];
      if (!req.session.visitedProducts.includes(productId)) {
          req.session.visitedProducts.push(productId);
      }

      res.render('productdetail', { product });
  } catch (err) {
      res.status(500).send(err);
  }
});
router.get("/", async (req, res) => {
  try {
    // Fetch the featured products
    const products = await Product.find({ isFeatured: true }).limit(5); // Adjust the limit as needed
    res.render("landingpage", { products }); // Pass the products to the view
  } catch (error) {
    res.status(500).send("Error fetching featured products");
  }
});

// Route to display the form for adding a new product
router.get("/new", (req, res) => {
  res.render("Products/new");
});

// Route to handle form submission and create a new product
router.post("/new", async (req, res) => {
  const { name, price, description, image, isFeatured } = req.body;
  const product = new Product({
    name: name,
    price: parseFloat(price), // Ensure price is a number
    description: description,
    image: image,
    isFeatured: isFeatured === 'on' // Checkbox value in form
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
  const { name, price, description, image, isFeatured } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    product.name = name;
    product.price = parseFloat(price); // Ensure price is a number
    product.description = description;
    product.image = image;
    product.isFeatured = isFeatured === 'on'; // Checkbox value in form
    await product.save();
    res.redirect("/products");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to display the form for updating the isFeatured status of a product by ID
router.get("/update-featured/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.render("Products/update-featured", { product });
});

// Route to handle form submission and update the isFeatured status of a product by ID
router.post("/update-featured/:id", async (req, res) => {
  const { isFeatured } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    product.isFeatured = isFeatured === 'on'; // Checkbox value in form
    await product.save();
    res.redirect("/products");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
