const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const path = require('path');

dotenv.config();

const app = express();
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, '');
const BACKEND_URL = (process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/+$/, '');
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'weddingbliss_secret_fallback',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID_PLACEHOLDER',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET_PLACEHOLDER',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || `${BACKEND_URL}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

// Configure Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || 'FACEBOOK_APP_ID_PLACEHOLDER',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'FACEBOOK_APP_SECRET_PLACEHOLDER',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || `${BACKEND_URL}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'emails']
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

app.use(cors({
  origin: (origin, callback) => {
    const defaults = [
      FRONTEND_URL,
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://capable-figolla-4b90c8.netlify.app',
    ];
    const allowed = new Set([...defaults, ...ALLOWED_ORIGINS]);
    const normalizedOrigin = (origin || '').replace(/\/+$/, '');

    // Allow requests without Origin (server-to-server, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowed.has(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/weddingbliss',
});

// Serve static files from the Vite build directory
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WeddingBliss API is running' });
});

// --- OAUTH ROUTES ---

app.get('/auth/google',
  (req, res, next) => {
    const returnTo = req.query.returnTo;
    if (returnTo) {
      req.session.oauthReturnTo = returnTo;
    }
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login?error=true` }),
  function(req, res) {
    const redirectBase = (req.session.oauthReturnTo || FRONTEND_URL).replace(/\/+$/, '');
    delete req.session.oauthReturnTo;
    const user = req.user || {};
    const name = encodeURIComponent(user.displayName || 'Google User');
    const email = encodeURIComponent((user.emails && user.emails[0] && user.emails[0].value) || '');
    const photo = encodeURIComponent((user.photos && user.photos[0] && user.photos[0].value) || '');
    res.redirect(`${redirectBase}/login?oauth=success&name=${name}&email=${email}&photo=${photo}`);
  });

app.get('/auth/facebook',
  (req, res, next) => {
    const returnTo = req.query.returnTo;
    if (returnTo) {
      req.session.oauthReturnTo = returnTo;
    }
    next();
  },
  passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${FRONTEND_URL}/login?error=true` }),
  function(req, res) {
    const redirectBase = (req.session.oauthReturnTo || FRONTEND_URL).replace(/\/+$/, '');
    delete req.session.oauthReturnTo;
    const user = req.user || {};
    const name = encodeURIComponent(user.displayName || 'Facebook User');
    const email = encodeURIComponent((user.emails && user.emails[0] && user.emails[0].value) || '');
    const photo = encodeURIComponent((user.photos && user.photos[0] && user.photos[0].value) || '');
    res.redirect(`${redirectBase}/login?oauth=success&name=${name}&email=${email}&photo=${photo}`);
  });

// --- API ROUTES ---

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

    const imagesResult = await pool.query('SELECT * FROM vendor_images WHERE vendor_id = $1', [id]);
    vendor.images = imagesResult.rows;

    const packagesResult = await pool.query('SELECT * FROM vendor_packages WHERE vendor_id = $1', [id]);
    vendor.packages = packagesResult.rows;
    
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

// 5. Get user dashboard data
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

// Catch-all route for any request that doesn't match the API or Auth routes
// should serve index.html for React Router to handle
app.use((req, res, next) => {
    // If it's an API or Auth route, let it pass to the respective handlers if they exist,
    // or eventually to a 404 if not found above.
    if (req.path.startsWith('/api') || req.path.startsWith('/auth')) {
      return next();
    }
    const indexPath = path.join(distPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(500).send('Error serving frontend');
        }
      }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
