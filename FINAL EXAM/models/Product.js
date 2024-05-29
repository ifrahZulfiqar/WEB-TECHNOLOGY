// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//     image: String,
//     name: String,
//     price: Number,
//     description: String
// }, {
//     versionKey: false 
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

const mongoose = require('mongoose');

// Define the schema for a Product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    image: String  // Assuming image field should be retained
});

// Create the model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
