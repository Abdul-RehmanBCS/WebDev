const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        // Get 4 featured products for homepage
        const featuredProducts = await Product.find().limit(4).sort({ createdAt: -1 });
        res.render('index', { featuredProducts });
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.render('index', { featuredProducts: [] });
    }
});

module.exports = router;

