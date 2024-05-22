const express = require("express");
const mongoose = require("mongoose");
const server = express();
const Product = require("./models/Product")
const layout = require("express-ejs-layouts");
const productsRoute = require("./routes/products");
const productsApiRoute = require("./routes/api/apiproducts");
const authRoute = require("./routes/auth");
const checkauth = require("./middlewares/checkauth");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const mainSiteMiddleware = require("./middlewares/main-site");
const { cookie } = require("express/lib/response");
const bodyParser = require("body-parser")
server.set("view engine", "ejs");
server.use(layout);
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(express.json());
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.urlencoded({ extended: true }));

server.use(mainSiteMiddleware);
server.use(expressSession({ secret: "My Secret Key" }));
server.use("/products", productsRoute);
server.use("/", productsApiRoute);
server.use("/", authRoute)

server.get("/", function(req, res) {
    res.render("landingpage");
});

server.get("/landingpage", function(req, res) {
    res.render("landingpage");
});

server.get("/contact", function(req, res) {
    res.render("contact");
});
server.get("/login", function(req, res) {
    res.render("login");
});
server.get("/signup", function(req, res) {
    res.render("signup");
});

server.get("/cart", checkauth, async (req, res) => {
    let cart = req.cookies.cart;
    if (!cart) cart = [];
    let products = await Product.find({ _id: { $in: cart } });
    res.render("cart", { products });
  });


// Route to list all products with pagination
server.get("/:page?", async (req, res) => {
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

  // Redirect the base /menu to /menu/1
server.get("/menu", (req, res) => {
    res.redirect("/menu/1");
  });

mongoose.connect("mongodb+srv://ifrahzulfiqar2002:hurry222@project0.o3wdu72.mongodb.net/")
    .then(() => {
        console.log("Node running and db connected");
    })
    .catch((error) => {
        console.error("ERROR: " + error);
    });

server.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
