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
import AdminRoute from './components/admin/AdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminSectionPage from './pages/admin/AdminSectionPage'
import AdminServicesPage from './pages/admin/AdminServicesPage'
import AdminServiceEditPage from './pages/admin/AdminServiceEditPage'

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
      <Route element={<AdminRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="secciones/:key" element={<AdminSectionPage />} />
          <Route path="servicios" element={<AdminServicesPage />} />
          <Route path="servicios/nuevo" element={<AdminServiceEditPage />} />
          <Route path="servicios/:id" element={<AdminServiceEditPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
