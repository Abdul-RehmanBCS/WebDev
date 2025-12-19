# TechMart E-Commerce Website

A complete e-commerce website built with Express.js, MongoDB, and EJS templates. This project includes all lab assignments and tasks.

## Features

### Lab Task 1 - Plain CSS Landing Page
- Semantic HTML5 structure
- Responsive design with media queries
- Accessibility features (alt text, focus states, contrast)
- Consistent spacing and type scales
- Hero section, features, testimonials, and footer

### Assignment 1 - Bootstrap Checkout Page
- Progress indicator (Cart → Checkout → Payment → Review)
- Customer & shipping form
- Order summary (sticky on desktop)
- Payment method selection
- Responsive design (mobile, tablet, desktop)

### Lab Assignment 2 - jQuery Form Validation
- Client-side validation for all form fields
- Real-time error feedback
- Bootstrap validation states
- Smooth scroll to first error
- Prevents submission until all validations pass

### Assignment 2 - Single Page CRUD App
- Create, Read, Update, Delete operations
- Uses JSONPlaceholder REST API
- jQuery AJAX for API calls
- Loading states and error handling
- Toast notifications

### Lab Task 3 - Express.js Application
- Express server setup
- EJS template engine
- Route organization
- Views and partials structure

### Assignment 3 - MongoDB Integration
- Mongoose ODM
- Product model with validation
- 15 sample products seeded
- Pagination (page, limit)
- Filtering (category, price range)

### Lab Task 4 - Admin Panel
- Separate admin layout
- Full CRUD operations for products
- Dashboard with statistics
- Product management interface

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB**
   Make sure MongoDB is running on `mongodb://localhost:27017/`

3. **Seed Database**
   ```bash
   node seed.js
   ```
   This will create 15 sample products in the database.

4. **Start Server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Products page: http://localhost:3000/products
   - Checkout: http://localhost:3000/checkout
   - CRUD app: http://localhost:3000/crud

## Project Structure

```
WebDevelopment_Final_Project/
├── models/
│   └── Product.js          # Product Mongoose model
├── routes/
│   ├── index.js            # Home route
│   ├── products.js         # Products listing with pagination/filtering
│   ├── checkout.js         # Checkout page
│   ├── crud.js             # CRUD app route
│   └── admin.js            # Admin panel routes
├── views/
│   ├── partials/
│   │   ├── header.ejs      # Main site header
│   │   └── footer.ejs      # Main site footer
│   ├── admin/
│   │   ├── header.ejs      # Admin header
│   │   ├── footer.ejs      # Admin footer
│   │   ├── dashboard.ejs   # Admin dashboard
│   │   ├── products.ejs    # Product list
│   │   └── product-form.ejs # Add/Edit product form
│   ├── index.ejs           # Landing page
│   ├── products.ejs        # Products listing page
│   ├── checkout.ejs        # Checkout page
│   ├── crud.ejs            # CRUD app page
│   └── error.ejs           # Error page
├── public/
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
├── server.js               # Express server
├── seed.js                 # Database seeding script
└── package.json            # Dependencies

```

## MongoDB Connection

The application connects to MongoDB at:
```
mongodb://localhost:27017/techmart
```

Make sure MongoDB is running before starting the server.

## Sample Products

The seed script creates 15 products across different categories:
- Electronics (Headphones, Smart Watch, Speaker, Keyboard, Webcam, SSD)
- Accessories (Laptop Stand, Mouse, USB Hub, Organizer, Monitor Stand, Phone Stand, Cable Kit, Desk Lamp, Cooling Pad)

## Admin Panel Features

- **Dashboard**: Overview with product statistics
- **Product List**: View all products with images
- **Add Product**: Create new products
- **Edit Product**: Update existing products
- **Delete Product**: Remove products from database

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Templates**: EJS
- **Frontend**: HTML5, CSS3, Bootstrap 5, jQuery
- **Validation**: jQuery client-side validation

## Notes

- The CRUD app uses JSONPlaceholder API (external REST API)
- All other features use MongoDB for data persistence
- Images use placeholder URLs - replace with actual product images in production
- Form validations are client-side only (jQuery)

## License

This project is created for educational purposes.

