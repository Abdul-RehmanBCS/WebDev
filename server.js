const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/techmart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Session middleware for cart
app.use(session({
    secret: 'techmart-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Initialize cart if it doesn't exist
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    res.locals.cartCount = req.session.cart.reduce((sum, item) => sum + item.quantity, 0);
    next();
});

// Routes
const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/products');
const checkoutRoutes = require('./routes/checkout');
const crudRoutes = require('./routes/crud');
const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');

app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/crud', crudRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

