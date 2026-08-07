import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminNotifications from './pages/admin/AdminNotifications'
import ProtectedRoute from './pages/admin/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute><AdminNotifications /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
