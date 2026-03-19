import { useState } from 'react'
import { CheckCircle, Calendar, MapPin, Users, Heart, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const SERVICES = [
  'Venue Booking', 'Photography & Videography', 'Wedding Decor & Styling', 
  'Bridal Makeup', 'Catering & Menu', 'Honeymoon Packages'
]

export default function EnquiryPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', partnerName: '', 
    planningStage: 'Just Started', guestCount: '50-200',
    budget: '', location: '', eventDate: '', services: [], message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const toggleService = (srv) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(srv) 
        ? prev.services.filter(s => s !== srv)
        : [...prev.services, srv]
    }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />

      {/* Hero Banner */}
      <div className="relative py-20 px-4 text-center text-white" style={{ background: 'linear-gradient(135deg, #5e1f2c, #802B3D)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, #D4AF37 1px, transparent 1px), radial-gradient(circle at 80% 20%, #D4AF37 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="badge-gold mb-6 inline-block">PLAN WITH US</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
            Let's Plan Your Dream Wedding
          </h1>
          <p className="text-[#f0e6e9] text-lg max-w-xl mx-auto">
            Share your vision with us, and our expert matchmaking team will connect you with the perfect vendors.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 -mt-10 relative z-20">
        
        {submitted ? (
          <div className="card p-12 text-center bg-white border-t-4 border-[#D4AF37]">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#802B3D', fontWeight: 700, marginBottom: '1rem' }}>
              Enquiry Received!
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
              Thank you, {formData.name}! Our dedicated wedding planner will review your details and reach out within 24 hours.
            </p>
            <button onClick={() => window.location.href='/'} className="btn-primary px-8 py-3">
              Return to Home
            </button>
          </div>
        ) : (
          <div className="card bg-white p-8 md:p-12 shadow-2xl">
            
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#802B3D] -z-10 transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }}></div>
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 ${step >= 1 ? 'bg-[#802B3D] text-white border-white shadow-md' : 'bg-gray-200 text-gray-500 border-white'}`}>1</div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 ${step === 2 ? 'bg-[#802B3D] text-white border-white shadow-md' : 'bg-gray-200 text-gray-500 border-white'}`}>2</div>
            </div>

            <form onSubmit={step === 1 ? handleNext : handleSubmit}>
              {/* STEP 1: Basic Info */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#2D2D2D', fontWeight: 700, marginBottom: '1.5rem' }}>
                    Couple Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Full Name *</label>
                      <input type="text" required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="input-field py-3" placeholder="Priya Sharma" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Partner's Name</label>
                      <input type="text" value={formData.partnerName} onChange={e=>setFormData({...formData, partnerName: e.target.value})} className="input-field py-3" placeholder="Rohan Kapoor" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input type="email" required value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="input-field py-3" placeholder="priya@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input type="tel" required value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="input-field py-3" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <hr className="border-gray-100 my-8" />

                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#2D2D2D', fontWeight: 700, marginBottom: '1.5rem' }}>
                    Event Snapshot
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Target Wedding Month / Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" onFocus={e=>e.target.type='date'} onChange={e=>setFormData({...formData, eventDate: e.target.value})} className="input-field pl-10 py-3 text-gray-600" placeholder="e.g. November 2024" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred City/Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} className="input-field pl-10 py-3" placeholder="e.g. Udaipur, Goa, Mumbai" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Guest Count</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select value={formData.guestCount} onChange={e=>setFormData({...formData, guestCount: e.target.value})} className="input-field pl-10 py-3 text-gray-600 cursor-pointer">
                          <option>Intimate (Under 50)</option>
                          <option>50 - 200 Guests</option>
                          <option>200 - 500 Guests</option>
                          <option>500+ Guests (Grand)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Budget Range</label>
                      <select value={formData.budget} onChange={e=>setFormData({...formData, budget: e.target.value})} className="input-field py-3 text-gray-600 cursor-pointer">
                        <option value="">Select Range</option>
                        <option>₹10L - ₹20L</option>
                        <option>₹20L - ₹50L</option>
                        <option>₹50L - ₹1Cr</option>
                        <option>₹1Cr + (Luxury)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-10">
                    <button type="submit" className="btn-primary py-3 px-8 flex items-center gap-2 text-lg">
                      Next Step <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Services & Details */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#2D2D2D', fontWeight: 700, marginBottom: '0.5rem' }}>
                    What services do you need?
                  </h3>
                  <p className="text-gray-500 mb-6 text-sm">Select all that apply to help us match you perfectly.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {SERVICES.map(srv => (
                      <label key={srv} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.services.includes(srv) ? 'border-[#802B3D] bg-rose-50/50' : 'border-gray-200 hover:border-[#D4AF37]'
                      }`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          formData.services.includes(srv) ? 'bg-[#802B3D] border-[#802B3D] text-white' : 'border-gray-300'
                        }`}>
                          {formData.services.includes(srv) && <CheckCircle size={14} />}
                        </div>
                        <span className="font-medium text-sm text-gray-700">{srv}</span>
                      </label>
                    ))}
                  </div>

                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#2D2D2D', fontWeight: 700, mt: '2rem', mb: '1rem' }}>
                    Tell us your story
                  </h3>
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Any specific visions, themes, or special requests?</label>
                    <textarea 
                      rows="5" 
                      value={formData.message} 
                      onChange={e=>setFormData({...formData, message: e.target.value})}
                      className="input-field py-3 resize-none" 
                      placeholder="e.g., We're dreaming of a sunset beach wedding with white and gold floral decor, featuring a live acoustic band..."
                    ></textarea>
                  </div>

                  <div className="flex justify-between items-center mt-10">
                    <button type="button" onClick={() => setStep(1)} className="btn-outline py-3 px-8 text-sm">
                      Back
                    </button>
                    <button type="submit" className="btn-gold py-3 px-10 text-lg shadow-lg">
                      Submit Enquiry
                    </button>
                  </div>
                </div>
              )}
            </form>

          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
