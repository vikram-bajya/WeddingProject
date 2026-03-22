import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Heart,
  User,
  ChevronDown,
  Settings,
  PencilLine,
  LogOut,
} from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "User",
    email: "",
    photo: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/vendors", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/#reviews", label: "Reviews" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      try {
        const stored = localStorage.getItem("userProfile");
        if (stored) {
          setUserProfile(JSON.parse(stored));
        } else {
          setUserProfile({ name: "User", email: "", photo: "" });
        }
      } catch {
        setUserProfile({ name: "User", email: "", photo: "" });
      }
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
    window.dispatchEvent(new Event("auth-change"));
    setIsLoggedIn(false);
    setProfileOpen(false);
    navigate("/login");
  };

  const userInitial = (userProfile?.name || "U").trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Heart className="text-[#3A8B95] fill-[#66D0BC]" size={24} />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#66D0BC",
                fontSize: "1.4rem",
                fontWeight: 700,
              }}
            >
              WeddingBliss
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/enquiry" className="btn-outline text-sm py-2 px-4">
              Enquire Now
            </Link>
            {!isLoggedIn ? (
              <Link to="/login" className="btn-primary text-sm py-2 px-4">
                Login
              </Link>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50"
                  onClick={() => setProfileOpen((prev) => !prev)}
                >
                  {userProfile?.photo ? (
                    <img
                      src={userProfile.photo}
                      alt={userProfile.name || "User"}
                      className="h-9 w-9 rounded-full object-cover border border-gray-100"
                    />
                  ) : (
                    <span className="h-9 w-9 rounded-full bg-[#FF3E9B] text-white flex items-center justify-center font-semibold">
                      {userInitial}
                    </span>
                  )}
                  <span className="hidden sm:inline text-sm font-semibold text-gray-800 truncate max-w-[150px]">
                    {userProfile?.name || "User"}
                  </span>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white shadow-lg py-2 z-50">
                    <div className="px-4 pb-2 mb-1 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {userProfile?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userProfile?.email || "No email"}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                    <Link
                      to="/edit-profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      <PencilLine size={16} />
                      Edit Profile
                    </Link>
                    <button
                      type="button"
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-red-500"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#FF3E9B" }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => (
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
              <Link to="/enquiry" className="btn-outline text-sm py-2 px-4">
                Enquire
              </Link>
              {!isLoggedIn ? (
                <Link to="/login" className="btn-primary text-sm py-2 px-4">
                  Login
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn-primary text-sm py-2 px-4"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
