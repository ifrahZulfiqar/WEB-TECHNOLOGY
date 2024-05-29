const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Save visited product ID in session
        if (!req.session.visitedProducts) {
            req.session.visitedProducts = [];
        }
        req.session.visitedProducts.push(product._id);

        res.render('product-details', { product });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;