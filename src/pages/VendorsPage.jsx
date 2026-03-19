import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, MapPin, Star, Heart, Filter, ChevronDown, SlidersHorizontal } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ALL_VENDORS = [
  { id: 1, name: 'The Grand Imperial Venue', category: 'Venue', rating: 4.9, reviews: 128, location: 'Mumbai', price: '₹2,00,000 – ₹8,00,000', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop' },
  { id: 2, name: 'Eternal Frames Photography', category: 'Photographer', rating: 4.8, reviews: 94, location: 'Delhi', price: '₹75,000 – ₹2,00,000', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop' },
  { id: 3, name: 'Royal Petals Decoration', category: 'Decorator', rating: 4.7, reviews: 71, location: 'Jaipur', price: '₹50,000 – ₹3,00,000', image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&auto=format&fit=crop' },
  { id: 4, name: 'Glitz & Glam Makeup Studio', category: 'Makeup', rating: 4.9, reviews: 113, location: 'Bangalore', price: '₹25,000 – ₹80,000', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop' },
  { id: 5, name: 'Spice Route Caterers', category: 'Caterer', rating: 4.6, reviews: 85, location: 'Chennai', price: '₹800 – ₹2,500 per plate', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop' },
  { id: 6, name: 'Beats & Bliss DJ', category: 'Music/DJ', rating: 4.8, reviews: 60, location: 'Hyderabad', price: '₹30,000 – ₹1,00,000', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop' },
  { id: 7, name: 'Sharma Wedding Photography', category: 'Photographer', rating: 4.9, reviews: 132, location: 'Mumbai', price: '₹80,000 – ₹2,50,000', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop' },
  { id: 8, name: 'The Palm Garden Venue', category: 'Venue', rating: 4.5, reviews: 55, location: 'Goa', price: '₹1,50,000 – ₹5,00,000', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop' },
  { id: 9, name: 'Ivory & Gold Planners', category: 'Decorator', rating: 4.7, reviews: 78, location: 'Delhi', price: '₹80,000 – ₹4,00,000', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop' },
]

const CATEGORIES = ['All', 'Venue', 'Photographer', 'Caterer', 'Decorator', 'Makeup', 'Music/DJ']
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Jaipur', 'Chennai', 'Hyderabad', 'Goa']
const RATINGS = ['5★ Only', '4★ & above', '3★ & above']

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#D4AF37' : '#ddd', fontSize: '0.9rem' }}>★</span>
      ))}
    </div>
  )
}

export default function VendorsPage() {
  const [searchParams] = useSearchParams()
  // "Draft" states for UI
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [selectedCities, setSelectedCities] = useState([])
  const [selectedRating, setSelectedRating] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [sort, setSort] = useState('Relevance')

  // "Applied" states for filtering
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    category: searchParams.get('category') || 'All',
    cities: [],
    rating: '',
    showFavorites: false
  })

  // Pagination & Favorites
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  // Keep favorites independent to persist across filter changes
  const [favorites, setFavorites] = useState([1, 4]) // Seed some favorites for demo

  const toggleCity = city => setSelectedCities(prev => prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city])
  const toggleFav = id => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])

  const applyFilters = () => {
    setAppliedFilters({ search, category: selectedCategory, cities: selectedCities, rating: selectedRating, showFavorites })
    setCurrentPage(1) // Reset to page 1 on new filter
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('All')
    setSelectedCities([])
    setSelectedRating('')
    setShowFavorites(false)
    setAppliedFilters({ search: '', category: 'All', cities: [], rating: '', showFavorites: false })
    setCurrentPage(1)
  }

  const filtered = ALL_VENDORS.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) || v.location.toLowerCase().includes(appliedFilters.search.toLowerCase())
    const matchCat = appliedFilters.category === 'All' || v.category === appliedFilters.category
    const matchCity = appliedFilters.cities.length === 0 || appliedFilters.cities.includes(v.location)
    const matchRating = !appliedFilters.rating || (appliedFilters.rating === '5★ Only' ? v.rating >= 4.9 : appliedFilters.rating === '4★ & above' ? v.rating >= 4 : v.rating >= 3)
    const matchFav = !appliedFilters.showFavorites || favorites.includes(v.id)
    return matchSearch && matchCat && matchCity && matchRating && matchFav
  })

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      <Header />

      {/* Page Banner */}
      <div className="page-banner">
        <p style={{ color: '#f0e6e9', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <Link to="/" className="hover:text-amber-400" style={{ color: '#D4AF37' }}>Home</Link> &gt; Vendors
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'white', fontWeight: 700 }}>
          Browse Wedding Vendors
        </h1>
        <p style={{ color: '#f0e6e9', marginTop: '0.5rem', fontSize: '1rem' }}>
          Discover {ALL_VENDORS.length * 5}+ verified vendors across India
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm py-4 px-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px] flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-rose-800 bg-white gap-2">
            <Search size={16} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by vendor name or city..." className="outline-none text-sm w-full" />
          </div>
          <button onClick={applyFilters} className="btn-primary text-sm py-2 px-6">Search</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="card p-6 sticky top-36">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal size={18} style={{ color: '#802B3D' }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#802B3D', fontWeight: 700, fontSize: '1.1rem' }}>Filter Results</h3>
              </div>

              {/* Saved/Favorites */}
              <div className="mb-6 border-b border-gray-100 pb-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#802B3D]">
                  <input type="checkbox" checked={showFavorites} onChange={(e) => setShowFavorites(e.target.checked)} className="accent-rose-800" />
                  <Heart size={16} className={showFavorites ? "fill-rose-800" : ""} /> Show Favorites Only
                </label>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Category</h4>
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer text-sm text-gray-600 hover:text-rose-800">
                    <input type="radio" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="accent-rose-800" />
                    {cat}
                  </label>
                ))}
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Minimum Rating</h4>
                {RATINGS.map(r => (
                  <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer text-sm text-gray-600 hover:text-rose-800">
                    <input type="radio" name="rating" value={r} checked={selectedRating === r} onChange={() => setSelectedRating(r)} className="accent-rose-800" />
                    {r}
                  </label>
                ))}
              </div>

              {/* City */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">City</h4>
                {CITIES.map(city => (
                  <label key={city} className="flex items-center gap-2 mb-2 cursor-pointer text-sm text-gray-600 hover:text-rose-800">
                    <input type="checkbox" checked={selectedCities.includes(city)} onChange={() => toggleCity(city)} className="accent-rose-800" />
                    {city}
                  </label>
                ))}
              </div>

              <button onClick={applyFilters} className="btn-primary w-full text-sm py-2 text-center">Apply Filters</button>
              <button onClick={clearFilters}
                className="w-full text-center text-sm mt-3" style={{ color: '#802B3D', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none' }}>
                Clear All
              </button>
            </div>
          </aside>

          {/* Vendor Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm">Showing <strong>{filtered.length}</strong> vendors</p>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white cursor-pointer hover:border-rose-800">
                {['Relevance', 'Rating: High to Low', 'Price: Low to High', 'Most Reviewed'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {currentItems.length === 0 ? (
              <div className="text-center py-20 text-gray-400 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-4xl mb-3">😔</p>
                <p className="text-lg text-gray-500 font-medium">No vendors found matching your filters.</p>
                <button onClick={clearFilters} className="mt-4 btn-outline py-2 px-6 text-sm">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map(vendor => (
                  <div key={vendor.id} className="card flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                    <div className="relative h-48 sm:h-52">
                      <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="badge-gold">{vendor.category}</span>
                      </div>
                      <button onClick={() => toggleFav(vendor.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                        <Heart size={16} className={favorites.includes(vendor.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} />
                      </button>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem', color: '#2d3748' }}>
                        {vendor.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mb-2">
                        <StarRating rating={vendor.rating} />
                        <span className="text-xs font-medium text-gray-500">{vendor.rating} ({vendor.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
                        <MapPin size={14} style={{ color: '#802B3D' }} />{vendor.location}
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <p style={{ color: '#802B3D', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem' }}>{vendor.price}</p>
                        <Link to={`/vendors/${vendor.id}`} className="btn-primary w-full text-center text-sm py-2.5 block rounded-md">View Details</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 bg-white py-4 rounded-xl shadow-sm border border-gray-100">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-50 text-rose-900 border border-transparent hover:border-rose-200"
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page} 
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${currentPage === page ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                    style={currentPage === page ? { backgroundColor: '#802B3D' } : {}}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-50 text-rose-900 border border-transparent hover:border-rose-200"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

