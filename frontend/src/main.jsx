import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import { SiteContentProvider } from './context/SiteContentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <SiteContentProvider>
          <App />
        </SiteContentProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
