import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  CheckCircle,
  Image as ImageIcon,
  Phone,
  MessageCircle,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const VENDOR_DATA = {
  id: 1,
  name: "Sharma Wedding Photography",
  category: "Photographer",
  rating: 4.9,
  reviews: 128,
  experience: "10+ Years",
  location: "Mumbai, Maharashtra",
  description:
    "Specializing in candid wedding photography, Sharma Wedding Photography captures the true essence and raw emotions of your big day. With over 10 years of experience shooting luxury weddings across India, our team ensures every fleeting smile and tear of joy is immortalized in cinematic quality.",
  images: [
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-8ec14d5e7512?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-702800a7b445?w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&auto=format&fit=crop",
  ],
  packages: [
    {
      name: "Basic Photo",
      price: "₹75,000",
      features: [
        "1 Candid Photographer",
        "1 Traditional Photographer",
        "Edited High-Res Images",
        "Soft Copy Delivery (Pendrive)",
      ],
    },
    {
      name: "Standard Combo",
      price: "₹1,25,000",
      features: [
        "2 Candid Photographers",
        "1 Traditional Photographer",
        "1 Cinematic Videographer",
        "3-5 Min Wedding Trailer",
        "Coffee Table Photo Book",
      ],
    },
    {
      name: "Premium Cinematic",
      price: "₹2,00,000",
      features: [
        "Full Team (Photo & Video)",
        "Drone Coverage",
        "Pre-Wedding Shoot (1 Day)",
        "Same Day Edit Video",
        "2 Premium Coffee Table Books",
      ],
    },
  ],
};

export default function VendorDetailPage() {
  const { id } = useParams();
  const [date, setDate] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-[#3A8B95]">
          Home
        </Link>{" "}
        &gt;{" "}
        <Link to="/vendors" className="hover:text-[#3A8B95]">
          Vendors
        </Link>{" "}
        &gt;{" "}
        <Link
          to={`/vendors?category=${VENDOR_DATA.category}`}
          className="hover:text-[#3A8B95]"
        >
          {VENDOR_DATA.category}s
        </Link>{" "}
        &gt;{" "}
        <span style={{ color: "#FF3E9B", fontWeight: 500 }}>
          {VENDOR_DATA.name}
        </span>
      </div>

      {/* Photo Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div
          className="relative rounded-2xl overflow-hidden mb-2"
          style={{ height: "500px" }}
        >
          <img
            src={VENDOR_DATA.images[0]}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
              <Heart size={20} className="text-rose-400" />
            </button>
          </div>
        </div>
        <div className="flex gap-2 relative">
          {VENDOR_DATA.images.slice(1).map((img, i) => (
            <div
              key={i}
              className={`flex-1 h-32 rounded-xl overflow-hidden ${i === 3 ? "relative cursor-pointer hover:opacity-90" : ""}`}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {i === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <ImageIcon size={18} /> View All Photos (48)
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (60%) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-6">
              <span className="badge-gold mb-3 inline-block">
                {VENDOR_DATA.category}
              </span>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#FF3E9B",
                  marginBottom: "0.5rem",
                }}
              >
                {VENDOR_DATA.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1 font-semibold">
                  <span className="text-[#66D0BC] text-lg">★</span>
                  <span className="text-gray-900">{VENDOR_DATA.rating}</span>
                  <span className="font-normal">
                    ({VENDOR_DATA.reviews} Reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <span>{VENDOR_DATA.experience} Experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <MapPin size={16} style={{ color: "#FF3E9B" }} />
                  <span>{VENDOR_DATA.location}</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {VENDOR_DATA.description}
              </p>
            </div>

            <hr className="border-gray-100 my-10" />

            {/* Packages */}
            <div className="mb-10">
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  color: "#FF3E9B",
                  fontWeight: 700,
                  mb: "1.5rem",
                }}
              >
                Our Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {VENDOR_DATA.packages.map((pkg, i) => (
                  <div
                    key={i}
                    className={`card p-6 border-2 ${i === 1 ? "border-[#66D0BC] relative" : "border-transparent"}`}
                  >
                    {i === 1 && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#66D0BC] text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    )}
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.2rem",
                        color: "#66D0BC",
                        fontWeight: 700,
                        mb: "0.25rem",
                      }}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      style={{
                        color: "#FF3E9B",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        mb: "1rem",
                      }}
                    >
                      {pkg.price}
                    </p>
                    <ul className="space-y-3 mb-6 mt-4">
                      {pkg.features.map((f, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle
                            size={16}
                            className="text-[#3A8B95] shrink-0 mt-0.5"
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="btn-outline w-full text-sm py-2">
                      Book Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar Enquiry Form 40%) */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <div className="card p-6 border border-gray-100">
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    color: "#FF3E9B",
                    fontWeight: 700,
                    mb: "1rem",
                    textAlign: "center",
                  }}
                >
                  Enquire About This Vendor
                </h3>
                <p className="text-center text-sm text-gray-500 mb-6">
                  Fill in your details and Sharma Wedding Photography will
                  contact you.
                </p>

                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      className="input-field py-2.5"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="input-field py-2.5"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/3">
                      <select className="input-field py-2.5 bg-gray-50 border-gray-200 text-gray-600">
                        <option>+91 (IND)</option>
                      </select>
                    </div>
                    <div className="w-2/3">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="input-field py-2.5"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`input-field py-2.5 ${!date ? "text-gray-400" : "text-gray-700"}`}
                    />
                  </div>
                  <div>
                    <select className="input-field py-2.5 text-gray-600">
                      <option value="">Select Event Type</option>
                      <option>Wedding</option>
                      <option>Engagement</option>
                      <option>Pre-Wedding Shoot</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      rows="3"
                      placeholder="Tell them about your dream wedding..."
                      className="input-field py-2.5 resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full py-3">
                    Send Enquiry
                  </button>
                </form>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="text-sm text-gray-400 font-medium">OR</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-[#66D0BC] text-amber-600 font-bold hover:bg-amber-50 transition-colors"
                  >
                    <Phone size={18} /> Call Now: +91 98765 43210
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/30"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
