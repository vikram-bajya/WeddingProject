import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SettingsPage() {
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
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings here.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
