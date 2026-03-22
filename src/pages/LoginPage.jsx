import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Heart,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Check,
  User,
  Phone,
} from "lucide-react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const apiBaseUrl =
    import.meta.env.VITE_API_URL || "https://weddingsnap.onrender.com";

  useEffect(() => {
    const oauthSuccess = searchParams.get("oauth") === "success";
    const hasError = searchParams.get("error") === "true";

    if (oauthSuccess) {
      const name = searchParams.get("name") || "User";
      const email = searchParams.get("email") || "";
      const photo = searchParams.get("photo") || "";
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ name, email, photo }),
      );
      window.dispatchEvent(new Event("auth-change"));
      navigate("/enquiry", { replace: true });
      return;
    }

    if (hasError) {
      setError("Social sign in failed. Please try again.");
    }

    // Redirect if already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/enquiry", { replace: true });
    }
  }, [navigate, searchParams]);

  const handleAuth = (e) => {
    e.preventDefault();
    setError(null);

    const existingProfile = (() => {
      try {
        return JSON.parse(localStorage.getItem("userProfile") || "null");
      } catch {
        return null;
      }
    })();

    const userProfile =
      activeTab === "register"
        ? {
            name: `${registerFirstName} ${registerLastName}`.trim() || "User",
            email: registerEmail.trim(),
            photo: "",
          }
        : existingProfile && existingProfile.email === loginEmail.trim()
          ? existingProfile
          : {
              name: loginEmail.trim()
                ? loginEmail.split("@")[0].replace(/[\d_\-\.]/g, "")
                : "User",
              email: loginEmail.trim(),
              photo: "",
            };

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    window.dispatchEvent(new Event("auth-change"));
    navigate("/enquiry");
  };

  const handleSocialAuth = (provider) => {
    const returnTo = encodeURIComponent(window.location.origin);
    if (provider === "Google") {
      window.location.href = `${apiBaseUrl}/auth/google?returnTo=${returnTo}`;
    } else if (provider === "Facebook") {
      window.location.href = `${apiBaseUrl}/auth/facebook?returnTo=${returnTo}`;
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel (50%) - Image Background */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden text-white flex-col justify-between p-12">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop"
          alt="Wedding Bliss"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A8B95] via-[#FF3E9B]/80 to-transparent"></div>

        <div className="relative z-10 pt-4">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline text-white"
          >
            <Heart className="fill-[#66D0BC] text-[#66D0BC]" size={32} />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: 700,
              }}
            >
              WeddingBliss
            </span>
          </Link>
        </div>

        <div className="relative z-10 pb-8">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Your Dream
            <br />
            Wedding Begins Here
          </h1>
          <p className="text-lg text-rose-100 max-w-md mb-10">
            Join thousands of couples who found their perfect vendors on
            WeddingBliss.
          </p>

          <div className="flex gap-6">
            {[
              ["10,000+", "Couples"],
              ["5,000+", "Vendors"],
              ["4.9★", "Rating"],
            ].map(([val, label]) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 border border-white/20"
              >
                <div
                  style={{
                    color: "#66D0BC",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                  }}
                >
                  {val}
                </div>
                <div className="text-xs text-rose-100 uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel (50%) - Forms */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16"
        style={{ backgroundColor: "#FFF7FA" }}
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <Heart className="fill-[#66D0BC] text-[#66D0BC]" size={28} />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#FF3E9B",
                fontSize: "1.75rem",
                fontWeight: 700,
              }}
            >
              WeddingBliss
            </span>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b-2 border-gray-200 mb-10 relative">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-center text-lg font-bold transition-colors ${activeTab === "login" ? "text-[#FF3E9B]" : "text-gray-400 hover:text-gray-600"}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 text-center text-lg font-bold transition-colors ${activeTab === "register" ? "text-[#FF3E9B]" : "text-gray-400 hover:text-gray-600"}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Register
            </button>
            {/* Animated underline indicator */}
            <div
              className="absolute bottom-[-2px] h-[2px] bg-[#FF3E9B] transition-all duration-300 ease-in-out w-1/2"
              style={{ left: activeTab === "login" ? "0%" : "50%" }}
            />
          </div>

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  color: "#FF3E9B",
                  fontWeight: 700,
                  marginBottom: "0.25rem",
                }}
              >
                Welcome Back!
              </h2>
              <p className="text-gray-500 mb-6">
                Sign in to manage your wedding planning
              </p>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleAuth}>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input-field pl-10 py-3"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input-field px-10 py-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm py-2">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input
                      type="checkbox"
                      className="accent-[#FF3E9B] w-4 h-4 rounded"
                    />{" "}
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="font-semibold text-amber-600 hover:text-[#3A8B95]"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-center py-3 text-lg mt-2 block"
                >
                  Sign In
                </button>
              </form>
            </div>
          )}

          {/* REGISTER FORM */}
          {activeTab === "register" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  color: "#FF3E9B",
                  fontWeight: 700,
                  marginBottom: "0.25rem",
                }}
              >
                Create Your Account
              </h2>
              <p className="text-gray-500 mb-6">
                Join to find and book your perfect vendors
              </p>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleAuth}>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input-field pl-10 py-3"
                      value={registerFirstName}
                      onChange={(e) => setRegisterFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative flex-1">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input-field pl-10 py-3"
                      value={registerLastName}
                      onChange={(e) => setRegisterLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input-field pl-10 py-3"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative flex gap-2">
                  <div className="w-[100px]">
                    <select
                      className="input-field py-3 text-center bg-gray-50"
                      defaultValue="+91"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="input-field pl-10 py-3"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input-field px-10 py-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="text-sm py-2">
                  <label className="flex items-start gap-2 cursor-pointer text-gray-600">
                    <input
                      type="checkbox"
                      className="accent-[#FF3E9B] w-4 h-4 rounded mt-1"
                    />
                    <span className="max-w-[90%]">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="font-semibold text-amber-600 hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      &{" "}
                      <a
                        href="#"
                        className="font-semibold text-amber-600 hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-center py-3 text-lg mt-2 block"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}

          {/* Social Auth Options (Shared) */}
          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-4 text-gray-500"
                  style={{ backgroundColor: "#FFF7FA" }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleSocialAuth("Google")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors font-semibold text-gray-700    btn-primary w-full text-center py-3 text-lg mt-2 block"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button
                onClick={() => handleSocialAuth("Facebook")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg transition-colors font-semibold"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
