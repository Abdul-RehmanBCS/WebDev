/**
 * Middleware: checkCartNotEmpty
 * Purpose: Ensures that a user cannot proceed to checkout or specific actions if their shopping cart is empty.
 * Logic: Checks the session object for the 'cart' array. If it's missing or empty, it redirects the user or returns an error.
 * Benefit: Prevents empty orders and improves user experience by redirecting them to the cart page to add items.
 */
const checkCartNotEmpty = (req, res, next) => {
    if (!req.session.cart || req.session.cart.length === 0) {
        // If it's an API call, return JSON, else redirect
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(400).json({ error: 'Cart is empty' });
        }
        return res.redirect('/cart');
    }
    next();
};

/**
 * Middleware: adminOnly
 * Restricts access to routes to only users with specific email addresses.
 * Usage: Apply to critical routes like Dashboard, Product Management.
 */
const adminOnly = (req, res, next) => {
    if (req.session.user && req.session.user.email === 'admin@shop.com') {
        return next();
    }
    res.status(403).render('error', { message: 'Access Denied: Admin only area' });
};

module.exports = {
    checkCartNotEmpty,
    adminOnly
};
