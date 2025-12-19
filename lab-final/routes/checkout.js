const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { checkCartNotEmpty } = require('../middleware');

// GET Checkout Page
router.get('/', checkCartNotEmpty, (req, res) => {
    const cart = req.session.cart || [];
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    res.render('checkout', { cart, total });
});

// POST Create Order
/**
 * Route: POST /
 * Purpose: Handles the final checkout process and order creation.
 * Flow:
 * 1. Validation: Checks if the cart contains items (via middleware).
 * 2. Input Validation: Validates customer details (Name, Email, Address) to ensure data integrity.
 * 3. Calculation: Fetches latest prices from DB to prevent tampering and calculates exact total.
 * 4. Persistence: Creates and saves a new Order document in MongoDB.
 * 5. Cleanup: Clears the user's session cart after successful order.
 */
router.post('/', checkCartNotEmpty, async (req, res) => {
    try {
        const cart = req.session.cart || [];
        if (cart.length === 0) {
            return res.status(400).render('error', { message: 'Cart is empty' });
        }

        // Recalculate total from DB (Task 4: Data Integrity)
        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart) {
            const product = await Product.findById(item.productId);
            if (product) {
                totalAmount += product.price * item.quantity;
                orderItems.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity
                });
            }
        }

        const { fullName, email, phone, address, city, postalCode, country } = req.body;

        // Task 4: Validate checkout form inputs (Server-side)
        const errors = [];
        if (!fullName || fullName.trim().length < 3) errors.push("Full name must be at least 3 characters.");
        if (!email || !email.includes('@')) errors.push("Please provide a valid email address.");
        if (!address || address.trim().length < 5) errors.push("Address is required and must be valid.");

        if (errors.length > 0) {
            return res.render('checkout', {
                cart,
                total: totalAmount,
                error: errors.join(' '),
                formData: req.body
            });
        }

        const newOrder = new Order({
            customer: {
                name: fullName,
                email,
                phone,
                address,
                city,
                postalCode,
                country
            },
            items: orderItems,
            totalAmount,
            status: 'Pending'
        });

        await newOrder.save();

        // Clear cart
        req.session.cart = [];

        res.redirect(`/checkout/confirmation/${newOrder._id}`);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).render('error', { message: 'Error processing your order' });
    }
});

// GET Order Confirmation
router.get('/confirmation/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).render('error', { message: 'Order not found' });
        }
        res.render('order-confirmation', { order });
    } catch (error) {
        console.error('Error loading confirmation:', error);
        res.status(500).render('error', { message: 'Error loading confirmation page' });
    }
});

module.exports = router;
