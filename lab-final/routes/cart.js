const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// View cart
// View cart
router.get('/', async (req, res) => {
    let cart = req.session.cart || [];
    let validCart = [];
    let total = 0;

    const cartPromises = cart.map(async (item) => {
        try {
            const product = await Product.findById(item.productId);
            if (product) {
                // Update details in case they changed
                item.price = product.price;
                item.name = product.name;
                item.image = product.image;
                return item;
            }
        } catch (err) {
            console.error('Error verifying product:', err);
        }
        return null;
    });

    const results = await Promise.all(cartPromises);
    validCart = results.filter(item => item !== null);

    // Calculate total
    validCart.forEach(item => {
        total += item.price * item.quantity;
    });

    req.session.cart = validCart;
    res.locals.cartCount = validCart.reduce((sum, item) => sum + item.quantity, 0);

    res.render('cart', { cart: validCart, total });
});

// Add to cart
router.post('/add/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const cart = req.session.cart || [];
        const existingItem = cart.find(item => item.productId.toString() === req.params.id);

        if (existingItem) {
            existingItem.quantity += parseInt(req.body.quantity) || 1;
        } else {
            cart.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: parseInt(req.body.quantity) || 1
            });
        }

        req.session.cart = cart;
        res.json({ success: true, message: 'Product added to cart', cartCount: cart.reduce((sum, item) => sum + item.quantity, 0) });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Error adding product to cart' });
    }
});

// Update cart item quantity
router.post('/update/:id', (req, res) => {
    const cart = req.session.cart || [];
    const item = cart.find(item => item.productId.toString() === req.params.id);

    if (item) {
        item.quantity = parseInt(req.body.quantity) || 1;
        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }
    }

    req.session.cart = cart;
    res.redirect('/cart');
});

// Remove from cart
router.post('/remove/:id', (req, res) => {
    const cart = req.session.cart || [];
    const index = cart.findIndex(item => item.productId.toString() === req.params.id);

    if (index > -1) {
        cart.splice(index, 1);
    }

    req.session.cart = cart;
    res.redirect('/cart');
});

// Clear cart
router.post('/clear', (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
});

module.exports = router;

