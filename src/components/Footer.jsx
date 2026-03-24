import { Link } from "react-router-dom";
import { Heart, Instagram, Facebook, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#3A8B95" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="fill-[#66D0BC] text-[#66D0BC]" size={22} />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#66D0BC",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                WeddingBliss
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              India's most trusted wedding vendor marketplace. Connecting
              couples with the best photographers, venues, caterers &amp; more.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#3A8B95] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#66D0BC",
              }}
              className="text-lg font-semibold mb-4"
            >
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                "Home",
                "Browse Vendors",
                "Pricing Plans",
                "About Us",
                "Contact",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="hover:text-[#66D0BC] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#66D0BC",
              }}
              className="text-lg font-semibold mb-4"
            >
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                "Wedding Venues",
                "Photographers",
                "Caterers",
                "Decorators",
                "Makeup Artists",
                "Music & DJ",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="hover:text-[#66D0BC] transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#66D0BC",
              }}
              className="text-lg font-semibold mb-4"
            >
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Get exclusive wedding tips & vendor deals straight to your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#66D0BC]"
              />
              <button className="btn-gold py-2 text-sm text-center">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 WeddingBliss. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-[#66D0BC]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#66D0BC]">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#66D0BC]">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
