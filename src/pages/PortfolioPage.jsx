import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Maximize2, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CATEGORIES = [
  "All",
  "Pre-Wedding",
  "Haldi",
  "Mehendi",
  "Wedding",
  "Reception",
];

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    type: "Wedding",
    title: "Royal Jaipur Wedding",
    image:
      "https://images.unsplash.com/photo-1511285560929-8ec14d5e7512?w=800&fit=crop",
    colSpan: false,
    rowSpan: true,
  },
  {
    id: 2,
    type: "Haldi",
    title: "Vibrant Haldi Ceremony",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&fit=crop",
    colSpan: false,
    rowSpan: false,
  },
  {
    id: 3,
    type: "Pre-Wedding",
    title: "Udaipur Sunset Shoot",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&fit=crop",
    colSpan: true,
    rowSpan: false,
  },
  {
    id: 4,
    type: "Mehendi",
    title: "Boho Mehendi Details",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&fit=crop",
    colSpan: false,
    rowSpan: true,
  },
  {
    id: 5,
    type: "Reception",
    title: "Glitz & Glam Reception",
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&fit=crop",
    colSpan: false,
    rowSpan: false,
  },
  {
    id: 6,
    type: "Wedding",
    title: "South Indian Traditions",
    image:
      "https://images.unsplash.com/photo-1532321484196-e2dbff8ee5a8?w=800&fit=crop",
    colSpan: true,
    rowSpan: true,
  },
  {
    id: 7,
    type: "Pre-Wedding",
    title: "Kerala Backwaters",
    image:
      "https://images.unsplash.com/photo-1494218933227-2c13032549e3?w=800&fit=crop",
    colSpan: false,
    rowSpan: false,
  },
  {
    id: 8,
    type: "Haldi",
    title: "Sunflowers & Joy",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&fit=crop",
    colSpan: false,
    rowSpan: false,
  },
  {
    id: 9,
    type: "Wedding",
    title: "Goa Beach Wedding",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&fit=crop",
    colSpan: true,
    rowSpan: false,
  },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeTab === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((img) => img.type === activeTab);

  return (
    <div className="min-h-screen bg-[#FFF7FA]">
      <Header />

      {/* Hero Banner */}
      <div
        className="page-banner relative overflow-hidden text-white"
        style={{ background: "#3A8B95" }}
      >
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&fit=crop"
          alt="Portfolio Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A8B95] via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center py-10">
          <p className="text-[#66D0BC] text-sm uppercase tracking-widest font-bold mb-4">
            Our Masterpieces
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Inspiring Real Weddings
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Browse through thousands of stunning moments captured by India's
            finest wedding professionals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === cat
                  ? "bg-[#FF3E9B] text-white shadow-md transform -translate-y-1"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF3E9B] hover:text-[#FF3E9B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[250px]">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 animate-in fade-in zoom-in duration-500 delay-${(index % 5) * 100} ${
                item.colSpan ? "md:col-span-2" : ""
              } ${item.rowSpan ? "row-span-2" : ""}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[#66D0BC] text-xs font-bold uppercase tracking-wider mb-1">
                  {item.type}
                </span>
                <h3
                  className="text-white text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <div className="absolute top-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-[#FF3E9B] transition-colors">
                    <Heart size={18} />
                  </button>
                  <button
                    onClick={() => setLightbox(item)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-gray-500 text-lg">
            No portfolio items found for this category yet.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200">
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={36} />
          </button>
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="text-white text-center mt-4">
              <span className="text-[#66D0BC] font-bold text-sm tracking-widest uppercase mb-2 block">
                {lightbox.type}
              </span>
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lightbox.title}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 px-4 text-center border-t border-gray-100 bg-white">
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#FF3E9B",
            marginBottom: "1rem",
          }}
        >
          Inspired by what you see?
        </h2>
        <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
          Sign up today to save these stunning ideas to your moodboard and
          connect with the vendors who created them.
        </p>
        <Link to="/enquiry" className="btn-primary py-3 px-10 text-lg">
          Start Planning Your Wedding
        </Link>
      </section>

      <Footer />
    </div>
  );
}
