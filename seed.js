const mongoose = require('mongoose');
const Product = require('./models/Product');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/techmart', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Sample products data
    const sampleProducts = [
        {
            name: 'Premium Wireless Headphones',
            price: 99.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1518441312886-0a0a5c1c3c9c',
            description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
            stock: 50
        },
        {
            name: 'Smart Watch Pro',
            price: 199.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b',
            description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS.',
            stock: 30
        },
        {
            name: 'Wireless Bluetooth Speaker',
            price: 79.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1585386959984-a41552231693',
            description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
            stock: 75
        },
        {
            name: 'Ergonomic Laptop Stand',
            price: 49.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1616628182504-8b66f6fbbfd3',
            description: 'Adjustable aluminum laptop stand for better ergonomics and cooling.',
            stock: 100
        },
        {
            name: 'Mechanical Keyboard RGB',
            price: 129.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef',
            description: 'RGB mechanical keyboard with Cherry MX switches and customizable lighting.',
            stock: 40
        },
        {
            name: 'Wireless Mouse',
            price: 29.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
            description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
            stock: 120
        },
        {
            name: 'USB-C Hub',
            price: 39.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f',
            description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
            stock: 80
        },
        {
            name: '4K Webcam',
            price: 149.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1616627458972-ff6d18c8f6a0',
            description: '4K webcam with auto-focus, noise cancellation, and privacy shutter.',
            stock: 25
        },
        {
            name: 'Desk Organizer Set',
            price: 24.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234',
            description: 'Bamboo desk organizer with compartments for office supplies.',
            stock: 150
        },
        {
            name: 'Monitor Stand with Drawer',
            price: 59.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1616627985125-2b6aefb58a8b',
            description: 'Wooden monitor stand with built-in drawer for storage.',
            stock: 60
        },
        {
            name: 'Phone Stand & Charger',
            price: 34.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
            description: 'Wireless charging phone stand with adjustable viewing angle.',
            stock: 90
        },
        {
            name: 'Cable Management Kit',
            price: 19.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1616627458972-5cdbd6c9502a',
            description: 'Complete cable management solution with clips, ties, and sleeves.',
            stock: 200
        },
        {
            name: 'LED Desk Lamp',
            price: 44.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
            description: 'Adjustable LED desk lamp with touch control and USB charging port.',
            stock: 70
        },
        {
            name: 'Laptop Cooling Pad',
            price: 27.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6',
            description: 'USB-powered laptop cooling pad with adjustable fan speeds.',
            stock: 110
        },
        {
            name: 'Portable External SSD',
            price: 89.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1627637816564-19a9d8b46b6d',
            description: '500GB portable SSD with USB-C connectivity and fast transfer speeds.',
            stock: 45
        }
    ];
    
    
    // Insert products
    await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${sampleProducts.length} products`);
    
    // Close connection
    mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
}).catch(err => {
    console.error('Error seeding database:', err);
    process.exit(1);
});

