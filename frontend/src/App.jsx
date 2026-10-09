import { Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import HomePage from './pages/HomePage'
import DescripcionPage from './pages/DescripcionPage'
import QuienesSomosPage from './pages/QuienesSomosPage'
import ServiciosPage from './pages/ServiciosPage'
import ServicioDetailPage from './pages/ServicioDetailPage'
import ContactoPage from './pages/ContactoPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="descripcion" element={<DescripcionPage />} />
        <Route path="quienes-somos" element={<QuienesSomosPage />} />
        <Route path="servicios" element={<ServiciosPage />} />
        <Route path="servicios/:slug" element={<ServicioDetailPage />} />
        <Route path="contacto" element={<ContactoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="admin/login" element={<AdminLoginPage />} />
      <Route path="admin" element={<AdminDashboardPage />} />
    </Routes>
  )
}

export default App
