import { Link } from 'react-router-dom'
import { Search, MapPin, Star, Heart, Camera, Utensils, Music, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CATEGORIES = [
  { icon: '🏛', name: 'Venues', count: 240 },
  { icon: '📷', name: 'Photographers', count: 180 },
  { icon: '🍽', name: 'Caterers', count: 150 },
  { icon: '🌸', name: 'Decorators', count: 120 },
  { icon: '💄', name: 'Makeup Artists', count: 95 },
  { icon: '🎵', name: 'Music & DJ', count: 80 },
]

const FEATURED_VENDORS = [
  {
    id: 1,
    name: 'The Grand Imperial Venue',
    category: 'Venue',
    rating: 4.9,
    reviews: 128,
    location: 'Mumbai, Maharashtra',
    price: '₹2,00,000 – ₹8,00,000',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Eternal Frames Photography',
    category: 'Photographer',
    rating: 4.8,
    reviews: 94,
    location: 'Delhi, NCR',
    price: '₹75,000 – ₹2,00,000',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Royal Petals Decoration',
    category: 'Decorator',
    rating: 4.7,
    reviews: 71,
    location: 'Jaipur, Rajasthan',
    price: '₹50,000 – ₹3,00,000',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&auto=format&fit=crop',
  },
]

const TESTIMONIALS = [
  {
    name: 'Priya & Rohan Sharma',
    date: 'Married: December 2024',
    review: 'WeddingBliss made our dream wedding come true! Found the perfect photographer and venue within our budget. Absolutely stress-free experience!',
    avatar: 'https://i.pravatar.cc/80?img=1',
  },
  {
    name: 'Anjali & Vikram Mehta',
    date: 'Married: November 2024',
    review: 'The vendor selection is incredible. Every vendor is verified and professional. Our caterer was top-notch thanks to WeddingBliss.',
    avatar: 'https://i.pravatar.cc/80?img=5',
  },
  {
    name: 'Sneha & Arjun Kapoor',
    date: 'Married: October 2024',
    review: 'From decorator to makeup artist — we found everything here. The enquiry system made it so easy to reach out to vendors directly.',
    avatar: 'https://i.pravatar.cc/80?img=9',
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'} style={{ fontSize: '1rem' }}>★</span>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section
        className="relative py-32 px-4 text-center text-white"
        style={{
          background: 'linear-gradient(135deg, #5e1f2c 0%, #802B3D 60%, #9a3550 100%)',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Decorative overlay pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px), radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-4xl mx-auto w-full">
          <div className="inline-block mb-4">
            <span className="badge-gold text-xs px-4 py-1">✨ India's #1 Wedding Vendor Marketplace</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Find Your Perfect<br />
            <span style={{ color: '#D4AF37' }}>Wedding Vendors</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#f0e6e9', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Discover top-rated photographers, venues, caterers & more for your dream day. 10,000+ couples trust WeddingBliss.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link to="/vendors" className="btn-gold text-base px-8 py-3">Browse Vendors</Link>
            <Link to="/contact" className="btn-outline-white text-base px-8 py-3">Learn More</Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-2 flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search vendors by name or city..."
                className="w-full outline-none text-gray-700 text-sm py-2"
              />
            </div>
            <Link to="/vendors" className="btn-primary text-sm px-6 py-2 rounded-lg whitespace-nowrap">Search</Link>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm">
            {[['10,000+', 'Happy Couples'], ['5,000+', 'Verified Vendors'], ['50+', 'Cities'], ['4.9★', 'Avg Rating']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div style={{ color: '#D4AF37', fontSize: '1.4rem', fontWeight: 700 }}>{val}</div>
                <div style={{ color: '#f0e6e9', fontSize: '0.8rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES / CATEGORIES */}
      <section id="services" className="py-20 px-4" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">Find the perfect vendor type for your wedding</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/vendors?category=${cat.name}`}
                className="card text-center p-6 cursor-pointer group border-2 border-transparent hover:border-amber-400 no-underline"
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 700, color: '#2D2D2D', marginBottom: '0.25rem' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#802B3D', fontWeight: 600 }}>{cat.count} Vendors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO / FEATURED VENDORS */}
      <section id="portfolio" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Featured Vendors</h2>
          <p className="section-subtitle">Hand-picked top-rated professionals for your big day</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_VENDORS.map(vendor => (
              <div key={vendor.id} className="card">
                <div className="relative">
                  <img src={vendor.image} alt={vendor.name} className="w-full object-cover" style={{ height: '220px' }} />
                  <div className="absolute top-3 left-3">
                    <span className="badge-gold">{vendor.category}</span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart size={16} className="text-rose-400" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={vendor.rating} />
                    <span className="text-sm text-gray-500">{vendor.rating} ({vendor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <MapPin size={14} style={{ color: '#802B3D' }} />
                    <span>{vendor.location}</span>
                  </div>
                  <p style={{ color: '#802B3D', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem' }}>{vendor.price}</p>
                  <Link to={`/vendors/${vendor.id}`} className="btn-primary w-full text-center text-sm py-2 block">View Details</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/vendors" className="btn-outline px-10 py-3 inline-flex items-center gap-2">
              View All Vendors <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="py-20 px-4" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-gold mb-4 inline-block tracking-widest uppercase">Planning Packages</span>
            <h2 className="section-title">Choose Your Perfect Plan</h2>
            <p className="section-subtitle">Transparent pricing for every wedding dream</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="card p-8 flex flex-col bg-white border border-gray-100 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-[#D4AF37] transition-colors duration-300"></div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2D2D2D', marginBottom: '0.5rem' }}>Essential</h3>
              <p className="text-gray-500 text-sm mb-6">Perfect for intimate celebrations</p>
              <div className="mb-8">
                <span className="text-4xl font-bold" style={{ color: '#802B3D' }}>₹50,000</span>
                <span className="text-gray-500">/wedding</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Dedicated Virtual Planner', 'Up to 3 Vendor Bookings', 'Basic Budget Management', 'Email Support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-[#D4AF37]" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/enquiry" className="btn-outline w-full text-center py-3 group-hover:bg-[#802B3D] group-hover:text-white transition-all duration-300">Book Essential</Link>
            </div>

            {/* Premium Plan - Highlighted */}
            <div className="card p-8 flex flex-col bg-[#802B3D] text-white shadow-2xl relative group transform md:-translate-y-4 hover:-translate-y-6 transition-transform duration-500">
              <div className="absolute top-4 right-4 animate-pulse">
                <span className="bg-[#D4AF37] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Premium</h3>
              <p className="text-[#f0e6e9] text-sm mb-6">The complete planning experience</p>
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">₹1,50,000</span>
                <span className="text-[#f0e6e9]">/wedding</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Dedicated On-site Coordinator', 'Unlimited Vendor Bookings', 'Advanced Budget & RSVP Tool', 'Theme & Decor Styling', '24/7 Priority Support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#f0e6e9]">
                    <CheckCircle size={16} className="text-[#D4AF37]" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/enquiry" className="btn-gold w-full text-center py-3 shadow-lg hover:scale-105 transition-transform duration-300">Book Premium</Link>
            </div>

            {/* Luxury Plan */}
            <div className="card p-8 flex flex-col bg-white border border-gray-100 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-[#D4AF37] transition-colors duration-300"></div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2D2D2D', marginBottom: '0.5rem' }}>Luxury</h3>
              <p className="text-gray-500 text-sm mb-6">Bespoke destination weddings</p>
              <div className="mb-8">
                <span className="text-4xl font-bold" style={{ color: '#802B3D' }}>Custom</span>
                <span className="text-gray-500">/pricing</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Full Execution & Management', 'Celebrity Artist Bookings', 'Destination Scouting', 'Hospitality & Logistics', 'Post-Wedding Services'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-[#D4AF37]" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/enquiry" className="btn-outline w-full text-center py-3 group-hover:bg-[#802B3D] group-hover:text-white transition-all duration-300">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Plan Your Dream Wedding</h2>
          <p className="section-subtitle">Three simple steps to your perfect wedding day</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {[
              { num: '01', icon: '🔍', title: 'Browse Vendors', desc: 'Explore thousands of verified vendors filtered by category, location, and budget to match your vision.' },
              { num: '02', icon: '📋', title: 'Compare & Shortlist', desc: 'Read real reviews, compare packages, save favourites and build your perfect wedding team.' },
              { num: '03', icon: '💍', title: 'Book & Celebrate', desc: 'Send enquiries, confirm bookings, and enjoy your dream wedding with confidence and ease.' },
            ].map(step => (
              <div key={step.num} className="text-center p-8 card relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ backgroundColor: '#D4AF37', color: '#1a1a1a', fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>
                  {step.num}
                </div>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{step.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#802B3D', fontWeight: 700, marginBottom: '0.75rem' }}>{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS / TESTIMONIALS */}
      <section id="reviews" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Real Love Stories</h2>
          <p className="section-subtitle">Thousands of couples have found their perfect wedding vendors through us</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#D4AF37', fontSize: '1.1rem' }}>★</span>)}
                </div>
                <p className="text-gray-600 italic text-sm leading-relaxed mb-6">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2D2D2D', fontFamily: "'Playfair Display', serif" }}>{t.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#802B3D' }}>{t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP / CONTACT AREA */}
      <section id="contact-map" className="py-10 px-4" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex-1 text-center md:text-left md:pl-8">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#802B3D', marginBottom: '0.5rem' }}>Come Visit Us</h2>
            <p className="text-gray-500 mb-6">We'd love to meet you and discuss your dream wedding in person.</p>
            <div className="flex items-start gap-4 mb-4 justify-center md:justify-start text-gray-700">
              <MapPin size={24} className="text-amber-500 flex-shrink-0" />
              <div className="text-sm">
                <strong>WeddingBliss HQ</strong><br />
                123 Wedding Lane, Bandra West<br />
                Mumbai, Maharashtra 400050
              </div>
            </div>
            <Link to="/contact" className="btn-primary mt-4 py-2 px-8 inline-block">Get Directions</Link>
          </div>
          <div className="flex-1 w-full rounded-xl overflow-hidden shadow-inner h-64 relative bg-gray-200">
              <div className="absolute inset-0 opacity-80 mix-blend-multiply" style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=Mumbai,India&zoom=11&size=600x300&maptype=roadmap')" }}></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <MapPin className="text-rose-600 drop-shadow-md" size={40} />
              </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 text-white text-center" style={{ background: 'linear-gradient(135deg, #5e1f2c, #802B3D)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            Ready to Plan Your Dream Wedding?
          </h2>
          <p style={{ color: '#f0e6e9', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Join 10,000+ couples who planned their perfect wedding with WeddingBliss.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/vendors" className="btn-gold px-10 py-3">Browse Vendors</Link>
            <Link to="/login" className="btn-outline-white px-10 py-3">Create Free Account</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
