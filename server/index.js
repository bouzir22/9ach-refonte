import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(join(__dirname, '../dist')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

// Initialize SQLite database
const db = new sqlite3.Database('server/database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Items table
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      price REAL NOT NULL,
      originalPrice REAL NOT NULL,
      image TEXT NOT NULL,
      images TEXT NOT NULL,
      condition TEXT NOT NULL,
      size TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      material TEXT,
      color TEXT,
      availability TEXT DEFAULT 'store',
      location TEXT,
      sellerName TEXT NOT NULL,
      sellerRating REAL DEFAULT 5.0,
      sellerReviews INTEGER DEFAULT 0,
      measurements TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      location TEXT,
      bio TEXT,
      avatar TEXT,
      joinDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      isAdmin BOOLEAN DEFAULT 0
    )
  `);

  // Orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      itemId INTEGER,
      quantity INTEGER DEFAULT 1,
      totalPrice REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id),
      FOREIGN KEY (itemId) REFERENCES items (id)
    )
  `);

  // Insert sample data if tables are empty
  db.get("SELECT COUNT(*) as count FROM items", (err, row) => {
    if (!err && row.count === 0) {
      insertSampleData();
    }
  });
}

// Insert sample data
function insertSampleData() {
  const sampleItems = [
    {
      name: 'Designer Silk Blouse',
      brand: 'Zara',
      price: 28,
      originalPrice: 89,
      image: 'https://i.ibb.co/wNfnmJGw/openart-image-mf7-Oyc-Wp-1749600824633-raw.jpg',
      images: JSON.stringify([
        'https://i.ibb.co/213Jtjsm/openart-image-om-IJRsrw-1749600800262-raw.jpg',
        'https://i.ibb.co/213Jtjsm/openart-image-om-IJRsrw-1749600800262-raw.jpg',
        'https://i.ibb.co/0jkjwVwX/openart-image-Z2kgq9s-G-1749600802549-raw.jpg',
        'https://i.ibb.co/wNfnmJGw/openart-image-mf7-Oyc-Wp-1749600824633-raw.jpg'
      ]),
      condition: 'Like New',
      size: 'S',
      category: 'Women\'s Fashion',
      description: 'Elegant silk blouse perfect for both office and evening wear. Features a classic cut with subtle shimmer that catches the light beautifully.',
      material: '100% Silk',
      color: 'Cream',
      availability: 'store',
      location: null,
      sellerName: 'Sarah M.',
      sellerRating: 4.8,
      sellerReviews: 127,
      measurements: JSON.stringify({
        chest: '34"',
        length: '24"',
        shoulders: '14"'
      })
    },
    {
      name: 'Vintage Denim Jacket',
      brand: 'Levi\'s',
      price: 45,
      originalPrice: 120,
      image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: JSON.stringify([
        'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]),
      condition: 'Good',
      size: 'M',
      category: 'Men\'s Fashion',
      description: 'Classic Levi\'s denim jacket with authentic vintage wash. Perfect for layering and adds instant cool to any outfit.',
      material: '100% Cotton Denim',
      color: 'Blue',
      availability: 'merchant',
      location: 'Downtown Fashion District, Los Angeles',
      sellerName: 'Mike R.',
      sellerRating: 4.9,
      sellerReviews: 89,
      measurements: JSON.stringify({
        chest: '40"',
        length: '26"',
        shoulders: '18"'
      })
    },
    {
      name: 'Cashmere Sweater',
      brand: 'Everlane',
      price: 35,
      originalPrice: 110,
      image: 'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: JSON.stringify([
        'https://images.pexels.com/photos/1021293/pexels-photo-1021293.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]),
      condition: 'Excellent',
      size: 'L',
      category: 'Women\'s Fashion',
      description: 'Luxuriously soft cashmere sweater in a timeless design. Perfect for cozy days and sophisticated styling.',
      material: '100% Cashmere',
      color: 'Beige',
      availability: 'store',
      location: null,
      sellerName: 'Emma L.',
      sellerRating: 5.0,
      sellerReviews: 203,
      measurements: JSON.stringify({
        chest: '42"',
        length: '25"',
        shoulders: '16"'
      })
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO items (
      name, brand, price, originalPrice, image, images, condition, size, category,
      description, material, color, availability, location, sellerName, sellerRating,
      sellerReviews, measurements
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  sampleItems.forEach(item => {
    stmt.run([
      item.name, item.brand, item.price, item.originalPrice, item.image, item.images,
      item.condition, item.size, item.category, item.description, item.material,
      item.color, item.availability, item.location, item.sellerName, item.sellerRating,
      item.sellerReviews, item.measurements
    ]);
  });

  stmt.finalize();
  console.log('Sample data inserted');
}

// API Routes

// Get all items
app.get('/api/items', (req, res) => {
  const { category, brand, size, condition, availability, minPrice, maxPrice, search } = req.query;
  
  let query = 'SELECT * FROM items WHERE 1=1';
  const params = [];

  if (category && category !== 'All') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (brand && brand !== 'All') {
    query += ' AND brand = ?';
    params.push(brand);
  }

  if (size && size !== 'All') {
    query += ' AND size = ?';
    params.push(size);
  }

  if (condition && condition !== 'All') {
    query += ' AND condition = ?';
    params.push(condition);
  }

  if (availability && availability !== 'All') {
    query += ' AND availability = ?';
    params.push(availability.toLowerCase());
  }

  if (minPrice) {
    query += ' AND price >= ?';
    params.push(parseFloat(minPrice));
  }

  if (maxPrice) {
    query += ' AND price <= ?';
    params.push(parseFloat(maxPrice));
  }

  if (search) {
    query += ' AND (name LIKE ? OR brand LIKE ? OR description LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }

  query += ' ORDER BY createdAt DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const items = rows.map(row => ({
      ...row,
      images: JSON.parse(row.images),
      measurements: row.measurements ? JSON.parse(row.measurements) : null,
      seller: {
        name: row.sellerName,
        rating: row.sellerRating,
        reviews: row.sellerReviews
      }
    }));

    res.json(items);
  });
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!row) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    const item = {
      ...row,
      images: JSON.parse(row.images),
      measurements: row.measurements ? JSON.parse(row.measurements) : null,
      seller: {
        name: row.sellerName,
        rating: row.sellerRating,
        reviews: row.sellerReviews
      }
    };

    res.json(item);
  });
});

// Create new item
app.post('/api/items', upload.array('images', 8), (req, res) => {
  const {
    name, brand, price, originalPrice, condition, size, category,
    description, material, color, availability, location, sellerName,
    sellerRating, sellerReviews, measurements
  } = req.body;

  // Handle uploaded images
  const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
  const mainImage = images[0] || req.body.image || '';

  const stmt = db.prepare(`
    INSERT INTO items (
      name, brand, price, originalPrice, image, images, condition, size, category,
      description, material, color, availability, location, sellerName, sellerRating,
      sellerReviews, measurements
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run([
    name, brand, parseFloat(price), parseFloat(originalPrice), mainImage, JSON.stringify(images),
    condition, size, category, description, material, color, availability || 'store',
    location, sellerName || 'Admin', parseFloat(sellerRating) || 5.0,
    parseInt(sellerReviews) || 0, measurements ? JSON.stringify(measurements) : null
  ], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      id: this.lastID,
      message: 'Item created successfully'
    });
  });

  stmt.finalize();
});

// Bulk create items
app.post('/api/items/bulk', (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Items array is required' });
    return;
  }

  const stmt = db.prepare(`
    INSERT INTO items (
      name, brand, price, originalPrice, image, images, condition, size, category,
      description, material, color, availability, location, sellerName, sellerRating,
      sellerReviews, measurements
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let successCount = 0;
  let errors = [];

  items.forEach((item, index) => {
    try {
      const images = item.images || [item.image];
      stmt.run([
        item.name, item.brand, parseFloat(item.price), parseFloat(item.originalPrice),
        item.image, JSON.stringify(images), item.condition, item.size, item.category,
        item.description, item.material, item.color, item.availability || 'store',
        item.location, item.seller?.name || 'Admin', parseFloat(item.seller?.rating) || 5.0,
        parseInt(item.seller?.reviews) || 0, item.measurements ? JSON.stringify(item.measurements) : null
      ], function(err) {
        if (err) {
          errors.push({ index, error: err.message });
        } else {
          successCount++;
        }
      });
    } catch (error) {
      errors.push({ index, error: error.message });
    }
  });

  stmt.finalize(() => {
    res.json({
      message: `Bulk upload completed`,
      successCount,
      totalItems: items.length,
      errors
    });
  });
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const {
    name, brand, price, originalPrice, condition, size, category,
    description, material, color, availability, location
  } = req.body;

  const stmt = db.prepare(`
    UPDATE items SET
      name = ?, brand = ?, price = ?, originalPrice = ?, condition = ?,
      size = ?, category = ?, description = ?, material = ?, color = ?,
      availability = ?, location = ?, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run([
    name, brand, parseFloat(price), parseFloat(originalPrice), condition,
    size, category, description, material, color, availability, location, id
  ], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json({ message: 'Item updated successfully' });
  });

  stmt.finalize();
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM items WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json({ message: 'Item deleted successfully' });
  });
});

// Get categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT DISTINCT category FROM items ORDER BY category', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const categories = rows.map(row => row.category);
    res.json(categories);
  });
});

// Get brands
app.get('/api/brands', (req, res) => {
  db.all('SELECT DISTINCT brand FROM items ORDER BY brand', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const brands = rows.map(row => row.brand);
    res.json(brands);
  });
});

// Get dashboard stats
app.get('/api/admin/stats', (req, res) => {
  const stats = {};

  // Get total items
  db.get('SELECT COUNT(*) as totalItems FROM items', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    stats.totalItems = row.totalItems;

    // Get total users
    db.get('SELECT COUNT(*) as totalUsers FROM users', (err, row) => {
      if (err) {
        stats.totalUsers = 0;
      } else {
        stats.totalUsers = row.totalUsers;
      }

      // Get total orders
      db.get('SELECT COUNT(*) as totalOrders, SUM(totalPrice) as totalRevenue FROM orders', (err, row) => {
        if (err) {
          stats.totalOrders = 0;
          stats.totalRevenue = 0;
        } else {
          stats.totalOrders = row.totalOrders || 0;
          stats.totalRevenue = row.totalRevenue || 0;
        }

        res.json(stats);
      });
    });
  });
});

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});