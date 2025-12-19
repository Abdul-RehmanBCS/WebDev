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

// Login Page
router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Login Logic
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Auth Logic (Any password works for demo)
    if (email) {
        req.session.user = {
            email,
            // Assign admin role if email matches, otherwise customer
            role: (email === 'admin@shop.com') ? 'admin' : 'customer'
        };

        // Redirect based on role
        res.redirect(email === 'admin@shop.com' ? '/admin' : '/');
    } else {
        res.render('login', { error: 'Please enter an email' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

