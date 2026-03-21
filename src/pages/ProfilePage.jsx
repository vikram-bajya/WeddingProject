import { useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ProfilePage() {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('userProfile') || '{}')
    } catch {
      return {}
    }
  }, [])

  const userInitial = (user?.name || 'U').trim().charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-[#FFF7FA]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="card p-8 bg-white">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#FF3E9B', fontWeight: 700 }}>
            User Profile
          </h1>
          <div className="mt-6 flex items-center gap-4">
            {user?.photo ? (
              <img src={user.photo} alt={user.name || 'User'} className="h-16 w-16 rounded-full object-cover border border-gray-100" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-[#FF3E9B] text-white flex items-center justify-center text-xl font-semibold">
                {userInitial}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-gray-800">{user?.name || 'User'}</p>
              <p className="text-sm text-gray-500">{user?.email || 'No email'}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
