const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/weddingbliss',
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WeddingBliss API is running' });
});

// --- ROUTES ---

// 1. Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get vendors with basic filtering
app.get('/api/vendors', async (req, res) => {
  const { category, location, search } = req.query;
  try {
    let query = `
      SELECT v.*, c.name as category_name 
      FROM vendors v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE 1=1
    `;
    const values = [];
    let idx = 1;

    if (category && category !== 'All') {
      query += ` AND c.name = $${idx}`;
      values.push(category);
      idx++;
    }
    
    if (location) {
      query += ` AND v.location ILIKE $${idx}`;
      values.push(`%${location}%`);
      idx++;
    }

    if (search) {
      query += ` AND (v.business_name ILIKE $${idx} OR v.location ILIKE $${idx})`;
      values.push(`%${search}%`);
      idx++;
    }

    query += ` ORDER BY v.rating DESC`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get single vendor details
app.get('/api/vendors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Basic vendor info
    const vendorResult = await pool.query(`
      SELECT v.*, c.name as category_name 
      FROM vendors v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE v.id = $1
    `, [id]);

    if (vendorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    const vendor = vendorResult.rows[0];

    // Images
    const imagesResult = await pool.query('SELECT * FROM vendor_images WHERE vendor_id = $1', [id]);
    vendor.images = imagesResult.rows;

    // Packages
    const packagesResult = await pool.query('SELECT * FROM vendor_packages WHERE vendor_id = $1', [id]);
    vendor.packages = packagesResult.rows;
    
    // Reviews
    const reviewsResult = await pool.query(`
      SELECT r.*, u.first_name, u.last_name 
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.vendor_id = $1
      ORDER BY r.created_at DESC
    `, [id]);
    vendor.reviews = reviewsResult.rows;

    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Submit an enquiry
app.post('/api/enquiries', async (req, res) => {
  const { vendor_id, user_id, event_date, event_type, message } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO enquiries (vendor_id, user_id, event_date, event_type, message, status) 
       VALUES ($1, $2, $3, $4, $5, 'Pending') RETURNING *`,
      [vendor_id, user_id, event_date, event_type, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get user dashboard data (Enquiries & Saved Vendors)
app.get('/api/users/:id/dashboard', async (req, res) => {
  const { id } = req.params;
  try {
    const enquiries = await pool.query(`
      SELECT e.*, v.business_name, c.name as category_name 
      FROM enquiries e
      JOIN vendors v ON e.vendor_id = v.id
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE e.user_id = $1
      ORDER BY e.created_at DESC
    `, [id]);

    const saved = await pool.query(`
      SELECT sv.*, v.business_name, v.rating, v.location, c.name as category_name
      FROM saved_vendors sv
      JOIN vendors v ON sv.vendor_id = v.id
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE sv.user_id = $1
      ORDER BY sv.saved_at DESC
    `, [id]);

    res.json({
      enquiries: enquiries.rows,
      saved_vendors: saved.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
