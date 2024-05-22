const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    description: String
}, {
    versionKey: false 
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;