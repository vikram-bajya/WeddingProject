import { MapPin, Phone, Mail, Clock, MessageCircle, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const FAQS = [
  { q: "How do I find the right vendor for my wedding?", a: "You can use our advanced search filters by category, city, price range, and rating. We also recommend reading client reviews and checking out their portfolios on their detail pages." },
  { q: "Is WeddingBliss free to use?", a: "Yes! WeddingBliss is completely free for couples to browse, shortlist, and contact vendors. You only pay the vendors directly for the services you book." },
  { q: "Can I contact multiple vendors at once?", a: "Absolutely. You can send enquiries to as many vendors as you like using our secure contact forms, and manage all their responses easily from your User Dashboard." },
  { q: "How do vendors get verified on WeddingBliss?", a: "We have a strict 5-step verification process verifying a vendor's business registration, past client testimonials, and portfolio authenticity before they receive the 'Verified' badge." },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF7FA' }}>
      <Header />

      {/* Hero */}
      <div className="page-banner">
        <p style={{ color: '#f0e6e9', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <a href="/" className="hover:text-[#66D0BC]" style={{ color: '#66D0BC' }}>Home</a> &gt; Contact
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: 'white', fontWeight: 700 }}>
          Contact Us
        </h1>
        <p style={{ color: '#f0e6e9', marginTop: '0.5rem', fontSize: '1.1rem', maxWidth: '600px', mx: 'auto' }}>
          We're here to make your dream wedding a reality. Reach out to our expert team anytime.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Info Strips - Negative Margin to overlap Hero slightly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-32 relative z-10 mb-16">
          <div className="card p-8 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-[#FF3E9B]/10 rounded-full flex items-center justify-center text-[#FF3E9B] mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Our Office</h3>
            <p className="text-gray-600 text-sm">123 Wedding Lane, Bandra West<br/>Mumbai, Maharashtra 400050</p>
          </div>
          
          <div className="card p-8 text-center flex flex-col items-center justify-center border-t-4 border-[#66D0BC]">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-[#66D0BC] mb-4">
              <Phone size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Call Us</h3>
            <p className="text-gray-600 text-sm mb-1">+91 98765 43210</p>
            <p className="text-gray-400 text-xs font-semibold uppercase">Mon-Sat 9AM-7PM</p>
          </div>
          
          <div className="card p-8 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-[#FF3E9B]/10 rounded-full flex items-center justify-center text-[#FF3E9B] mb-4">
              <Mail size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Email Us</h3>
            <p className="text-gray-600 text-sm mb-1">hello@weddingbliss.in</p>
            <p className="text-gray-400 text-xs font-semibold uppercase">We reply within 24 hours</p>
          </div>
        </div>

        {/* Main Split Section Form / Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 relative">
          
          {/* Form (55%) */}
          <div className="lg:col-span-7 card p-8 md:p-10 shadow-xl border border-gray-100">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: '#FF3E9B', fontWeight: 700, mb: '0.5rem' }}>
              Send Us a Message
            </h2>
            <p className="text-gray-500 mb-8 text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><input type="text" placeholder="Full Name" className="input-field" /></div>
                <div><input type="email" placeholder="Email Address" className="input-field" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><input type="tel" placeholder="Phone Number (+91)" className="input-field" /></div>
                <div><input type="text" placeholder="Wedding Date (DD/MM/YYYY)" onFocus={e=>e.target.type='date'} className="input-field text-gray-500" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <select className="input-field text-gray-500 cursor-pointer">
                    <option value="">Vendor Category Focus</option>
                    <option>Venues</option><option>Photographers</option><option>Decorators</option>
                  </select>
                </div>
                <div>
                  <select className="input-field text-gray-500 cursor-pointer">
                    <option value="">Budget Range</option>
                    <option>Under ₹50K</option><option>₹50K - ₹2L</option><option>Over ₹5L</option>
                  </select>
                </div>
              </div>
              <div>
                <textarea rows="5" placeholder="Tell us about your dream wedding or enquiry..." className="input-field resize-none"></textarea>
              </div>
              <button type="button" className="btn-gold w-full py-4 text-base shadow-md flex items-center justify-center gap-2">
                Send Message
              </button>
              <p className="text-center text-xs text-gray-400 mt-3 font-semibold">
                🔒 Your information is 100% secure and will never be shared.
              </p>
            </form>
          </div>

          {/* Map/Sidebar (45%) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Map Placeholder */}
            <div className="card overflow-hidden h-64 relative bg-gray-200 flex items-center justify-center group cursor-pointer border border-gray-200">
              <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=Mumbai,India&zoom=11&size=600x300&maptype=roadmap')" }}></div>
              <div className="relative flex flex-col items-center bg-white/90 px-6 py-4 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
                <MapPin className="text-[#FF3E9B] mb-2" size={32} />
                <span className="font-bold text-gray-800">WeddingBliss HQ Mumbai</span>
              </div>
            </div>

            {/* WhatsApp CTA Card */}
            <div className="card p-6 border border-gray-100 shadow-md bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle size={24} className="text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Chat Instantly</h4>
                  <p className="text-sm text-gray-500">Fast replies from our expert vendor matchmakers on WhatsApp.</p>
                </div>
              </div>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-full py-3 rounded-lg bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-sm">
                Chat on WhatsApp
              </a>
            </div>

            {/* Business Hours details */}
            <div className="card p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-[#FF3E9B]">
                <Clock size={20} />
                <h4 className="font-bold text-gray-800 text-lg">Business Hours</h4>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between items-center"><span className="font-medium">Monday - Friday</span> <span>9:00 AM - 7:00 PM</span></li>
                <li className="flex justify-between items-center"><span className="font-medium">Saturday</span> <span>9:00 AM - 5:00 PM</span></li>
                <li className="flex justify-between items-center"><span className="font-medium">Sunday</span> <span className="text-[#FF3E9B] font-bold uppercase text-xs">Closed</span></li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto py-10">
          <h2 className="section-title mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="card border border-gray-100 overflow-hidden cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                <div className="px-6 py-5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                  <h4 className="font-bold text-gray-800 pr-8">{faq.q}</h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === i ? 'bg-[#FF3E9B] text-white' : 'bg-gray-100 text-[#FF3E9B]'}`}>
                    {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
