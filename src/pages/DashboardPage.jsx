import { Link } from 'react-router-dom'
import { Home, ClipboardList, Heart, Calendar, CheckSquare, Settings, LogOut, Search, Bell, ChevronDown, Trash2 } from 'lucide-react'

const ENQUIRIES = [
  { id: 1, vendor: 'The Grand Imperial', type: 'Venue', date: 'Oct 12, 2024', status: 'Confirmed', badge: 'bg-green-100 text-green-700' },
  { id: 2, vendor: 'Eternal Frames', type: 'Photographer', date: 'Oct 15, 2024', status: 'Pending', badge: 'bg-yellow-100 text-yellow-700' },
  { id: 3, vendor: 'Royal Petals', type: 'Decor', date: 'Oct 18, 2024', status: 'Replied', badge: 'bg-blue-100 text-blue-700' },
  { id: 4, vendor: 'Glitz & Glam', type: 'Makeup', date: 'Oct 20, 2024', status: 'Confirmed', badge: 'bg-green-100 text-green-700' },
  { id: 5, vendor: 'Ivory & Gold', type: 'Planning', date: 'Oct 22, 2024', status: 'Pending', badge: 'bg-yellow-100 text-yellow-700' },
]

const SAVED = [
  { name: 'Sharma Photography', type: 'Photo', rating: 4.9, img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200&fit=crop' },
  { name: 'Spice Route', type: 'Catering', rating: 4.6, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&fit=crop' },
  { name: 'The Palm Garden', type: 'Venue', rating: 4.5, img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=200&fit=crop' },
  { name: 'Beats & Bliss', type: 'Music', rating: 4.8, img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&fit=crop' },
]

const CHECKLIST = [
  { id: 1, task: 'Book Venue', done: true },
  { id: 2, task: 'Book Photographer', done: true },
  { id: 3, task: 'Book Caterer', done: false },
  { id: 4, task: 'Send Invitations', done: false },
  { id: 5, task: 'Book Decorator', done: false },
  { id: 6, task: 'Arrange Music/DJ', done: false },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F8F9FA' }}>
      
      {/* LEFT SIDEBAR (Fixed) */}
      <aside className="w-[260px] flex-shrink-0 bg-[#FAF9F6] border-r border-gray-200 h-screen sticky top-0 flex flex-col hidden md:flex">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Heart className="fill-amber-400 text-amber-400" size={20} />
            <span style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '1.25rem', fontWeight: 700 }}>WeddingBliss</span>
          </Link>
        </div>

        {/* User Profile Info */}
        <div className="p-6 pb-4 border-b border-gray-200 text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] p-0.5 mx-auto mb-3">
            <img src="https://i.pravatar.cc/150?img=5" alt="Priya" className="w-full h-full rounded-full object-cover" />
          </div>
          <h2 className="font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>Priya Sharma</h2>
          <span className="badge-gold text-[0.65rem] mt-1 inline-block uppercase shadow-sm">👑 Premium Member</span>
        </div>

        {/* Countdown Card Sidebar */}
        <div className="px-6 py-4">
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-3 text-center shadow-inner">
            <p className="text-xs text-amber-700 font-semibold mb-1 uppercase tracking-wide">Your Big Day</p>
            <p className="text-amber-900 font-bold mb-0.5">June 15, 2025</p>
            <p className="text-2xl font-black text-[#D4AF37]">87 Days 🎉</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
          {[
            { icon: <Home size={18} />, label: 'Overview', active: true },
            { icon: <ClipboardList size={18} />, label: 'My Enquiries' },
            { icon: <Heart size={18} />, label: 'Saved Vendors' },
            { icon: <Calendar size={18} />, label: 'Appointments' },
            { icon: <CheckSquare size={18} />, label: 'Wedding Checklist' },
            { icon: <Settings size={18} />, label: 'Profile Settings' },
          ].map(item => (
            <a key={item.label} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
              ${item.active ? 'bg-[#802B3D] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              {item.icon} {item.label}
            </a>
          ))}
        </nav>

        {/* Logout Bottom */}
        <div className="p-4 border-t border-gray-200">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
            <LogOut size={18} /> Logout
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden max-w-full">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex-1 md:hidden">
            <span style={{ fontFamily: "'Playfair Display', serif", color: '#802B3D', fontSize: '1.2rem', fontWeight: 700 }}>Dashboard</span>
          </div>
          
          {/* Search Icon */}
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hidden md:flex ml-auto">
            <Search size={20} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto md:ml-4">
            <button className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 border border-white"></span>
            </button>
            <button className="flex items-center gap-2 pl-2">
              <img src="https://i.pravatar.cc/150?img=5" alt="Avatar" className="w-8 h-8 rounded-full border border-gray-300" />
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-sm font-bold text-gray-700">Priya</span>
              </div>
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Pane */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* Greeting */}
          <div className="mb-8">
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#802B3D', fontSize: '2.25rem', fontWeight: 700 }}>Good Morning, Priya! ☀️</h1>
            <p className="text-gray-600 mt-1">Here's your wedding planning overview</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card p-5 lg:p-6 border-l-4 border-[#802B3D]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Enquiries Sent</p>
                  <p className="text-3xl font-bold text-gray-800">12</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-[#802B3D]">
                  <ClipboardList size={20} />
                </div>
              </div>
            </div>

            <div className="card p-5 lg:p-6 border-l-4 border-[#D4AF37]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Saved Vendors</p>
                  <p className="text-3xl font-bold text-gray-800">8</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#D4AF37]">
                  <Heart size={20} className="fill-[#D4AF37]" />
                </div>
              </div>
            </div>

            <div className="card p-5 lg:p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Checklist Progress</p>
              <div className="flex items-end gap-2 mb-2">
                <p className="text-3xl font-bold text-gray-800">65%</p>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#802B3D] h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="card p-5 lg:p-6 text-white" style={{ background: 'linear-gradient(135deg, #f0d060, #D4AF37)' }}>
              <p className="text-sm font-semibold text-[#5e1f2c] uppercase tracking-wider mb-1">Days to Wedding</p>
              <p className="text-3xl font-bold text-white mb-1 shadow-sm">87 Days</p>
              <p className="text-xs text-[#5e1f2c] font-medium">June 15, 2025</p>
            </div>
          </div>

          {/* Recent Enquiries Table */}
          <div className="card mb-8">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#2D2D2D' }}>Recent Enquiries</h3>
              <a href="#" className="text-sm font-semibold text-[#802B3D] hover:underline">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="py-3 px-6 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">Vendor Name</th>
                    <th className="py-3 px-6 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">Category</th>
                    <th className="py-3 px-6 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">Date Sent</th>
                    <th className="py-3 px-6 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">Status</th>
                    <th className="py-3 px-6 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ENQUIRIES.map((eq, i) => (
                    <tr key={eq.id} className={i !== ENQUIRIES.length - 1 ? 'border-b border-gray-50' : ''}>
                      <td className="py-4 px-6 font-semibold text-gray-800">{eq.vendor}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{eq.type}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{eq.date}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${eq.badge}`}>{eq.status}</span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">View Details</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Saved Vendors Grid */}
            <div className="card p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-5">
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#2D2D2D' }}>Saved Vendors</h3>
                <a href="#" className="text-sm font-semibold text-[#802B3D] hover:underline">View All</a>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {SAVED.map((v, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg overflow-hidden group">
                    <div className="h-24 overflow-hidden relative">
                      <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3 relative">
                      <button className="absolute -top-4 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors">
                        <Trash2 size={14} />
                      </button>
                      <h4 className="font-bold text-gray-800 text-sm truncate">{v.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-[#D4AF37] font-semibold">{v.type}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-0.5">★ {v.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div className="card p-6 h-full flex flex-col">
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#2D2D2D', mb: '0.25rem' }}>Wedding Checklist</h3>
              <div className="flex items-center gap-3 mb-5 mt-1">
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="bg-[#D4AF37] h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-xs font-bold text-gray-400">65% DONE</span>
              </div>
              
              <div className="space-y-1 flex-1">
                {CHECKLIST.map(item => (
                  <label key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group text-sm">
                    <div className={`w-5 h-5 rounded border ${item.done ? 'bg-[#802B3D] border-[#802B3D] text-white flex items-center justify-center' : 'border-gray-300 bg-white group-hover:border-[#802B3D]'}`}>
                      {item.done && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className={`flex-1 font-medium ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.task}</span>
                  </label>
                ))}
              </div>
              <button className="btn-outline w-full py-2 mt-4 text-sm">View Full Checklist</button>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
