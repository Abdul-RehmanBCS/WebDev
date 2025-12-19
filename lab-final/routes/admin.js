const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const { adminOnly } = require('../middleware');

// Protect all admin routes
router.use(adminOnly);

// Admin Dashboard
router.get('/', async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const products = await Product.find().limit(5).sort({ createdAt: -1 });
        res.render('admin/dashboard', { totalProducts, products });
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
        res.status(500).render('error', { message: 'Error loading dashboard' });
    }
});

// Product List
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.render('admin/products', { products });
    } catch (error) {
        console.error('Error loading products:', error);
        res.status(500).render('error', { message: 'Error loading products' });
    }
});

// Add Product Form
router.get('/products/new', (req, res) => {
    res.render('admin/product-form', { product: null, isEdit: false });
});

// Create Product
router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).render('error', { message: 'Error creating product' });
    }
});

// Edit Product Form
router.get('/products/:id/edit', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { message: 'Product not found' });
        }
        res.render('admin/product-form', { product, isEdit: true });
    } catch (error) {
        console.error('Error loading product:', error);
        res.status(500).render('error', { message: 'Error loading product' });
    }
});

// Update Product
router.put('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).render('error', { message: 'Error updating product' });
    }
});

// Delete Product
router.delete('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).render('error', { message: 'Error deleting product' });
    }
});

// Order List
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.render('admin/orders', { orders });
    } catch (error) {
        console.error('Error loading orders:', error);
        res.status(500).render('error', { message: 'Error loading orders' });
    }
});

// Update Order Status
router.put('/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await Order.findByIdAndUpdate(req.params.id, { status });
        res.redirect('/admin/orders');
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).render('error', { message: 'Error updating order' });
    }
});

module.exports = router;

