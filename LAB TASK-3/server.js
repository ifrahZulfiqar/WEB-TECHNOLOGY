const express = require("express");
const mongoose = require("mongoose");
const server = express();
const Product = require("./models/Product")
const layout = require("express-ejs-layouts");
const productsRoute = require("./routes/products");
const productsApiRoute = require("./routes/api/apiproducts");

server.use(express.static("public"));
server.use(layout);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/products", productsRoute);
server.use("/api/products", productsApiRoute);

server.set("view engine", "ejs");

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

server.get("/menu", async function(req, res) {
    const products = await Product.find();
    const totalPages = Math.ceil(products.length / 10); // Example calculation for pagination
    res.render("Products/menu", { totalPages, products });
    res.render("Products/menu");
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
