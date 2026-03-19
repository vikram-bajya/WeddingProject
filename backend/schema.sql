-- WeddingBliss PostgreSQL Schema v1.0

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- 'user', 'vendor', 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS vendors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    description TEXT,
    location VARCHAR(255),
    price_range VARCHAR(100),
    experience VARCHAR(100),
    rating NUMERIC(3, 2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vendor_images (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_hero BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS vendor_packages (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    features JSONB NOT NULL -- Array of Strings stored as JSONB
);

CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    event_date DATE,
    event_type VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Replied', 'Confirmed', 'Declined'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_vendors (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, vendor_id)
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    event_date VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Categories
INSERT INTO categories (name, icon) VALUES 
('Venues', '🏛'), 
('Photographers', '📷'), 
('Caterers', '🍽'), 
('Decorators', '🌸'), 
('Makeup Artists', '💄'), 
('Music & DJ', '🎵')
ON CONFLICT (name) DO NOTHING;
