import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Heart } from 'lucide-react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/vendors', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/#reviews', label: 'Reviews' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Heart className="text-amber-500 fill-amber-400" size={24} />
            <span style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '1.4rem', fontWeight: 700 }}>
              WeddingBliss
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.label} to={link.to} className="nav-link">{link.label}</Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/enquiry" className="btn-outline text-sm py-2 px-4">Enquire Now</Link>
            <Link to="/login" className="btn-primary text-sm py-2 px-4">Login</Link>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: '#802B3D' }}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="block py-2 nav-link text-base"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              <Link to="/enquiry" className="btn-outline text-sm py-2 px-4">Enquire</Link>
              <Link to="/login" className="btn-primary text-sm py-2 px-4">Login</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
