import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VendorsPage from './pages/VendorsPage'
import VendorDetailPage from './pages/VendorDetailPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ContactPage from './pages/ContactPage'
import EnquiryPage from './pages/EnquiryPage'
import PortfolioPage from './pages/PortfolioPage'

// Note: Using react-router-dom for routing (TanStack Router v1 compatible pattern)
// Replace with TanStack Router if needed per PRD

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/vendors', element: <VendorsPage /> },
  { path: '/vendors/:id', element: <VendorDetailPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/enquiry', element: <EnquiryPage /> },
  { path: '/portfolio', element: <PortfolioPage /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
