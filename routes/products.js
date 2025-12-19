const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with pagination and filtering
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const category = req.query.category;
        const minPrice = parseFloat(req.query.minPrice);
        const maxPrice = parseFloat(req.query.maxPrice);

        // Build query
        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }
        if (!isNaN(minPrice)) {
            query.price = { $gte: minPrice };
        }
        if (!isNaN(maxPrice)) {
            query.price = { ...query.price, $lte: maxPrice };
        }

        // Get products and total count
        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        // Get unique categories for filter
        const categories = await Product.distinct('category');

        res.render('products', {
            products,
            currentPage: page,
            totalPages,
            totalProducts,
            limit,
            categories,
            selectedCategory: category || 'all',
            minPrice: minPrice || '',
            maxPrice: maxPrice || ''
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).render('error', { message: 'Error loading products' });
    }
});

// Get single product detail
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        
        // Get related products (same category)
        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        }).limit(4);
        
        res.render('product-detail', { product, relatedProducts });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).render('error', { message: 'Error loading product' });
    }
});

module.exports = router;

