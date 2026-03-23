import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const initialUser = (() => {
    try {
      const stored = JSON.parse(localStorage.getItem("userProfile") || "{}");
      return {
        name: stored?.name || "",
        email: stored?.email || "",
        photo: stored?.photo || "",
      };
    } catch {
      return { name: "", email: "", photo: "" };
    }
  })();

  const [form, setForm] = useState(initialUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(form));
    window.dispatchEvent(new Event("auth-change"));
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#FFF7FA]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="card p-8 bg-white">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              color: "#FF3E9B",
              fontWeight: 700,
            }}
          >
            Edit Profile
          </h1>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="input-field"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="input-field"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                type="url"
                className="input-field"
                value={form.photo}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, photo: e.target.value }))
                }
                placeholder="https://example.com/profile.jpg"
              />
            </div>
            <button type="submit" className="btn-primary">
              Save Profile
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
