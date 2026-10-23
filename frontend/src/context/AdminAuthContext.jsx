import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { adminCredentials, AUTH_SESSION_KEY } from '../config/authConfig'
import { useCmsApi } from '../config/apiConfig'
import { loginAdmin, setAdminToken } from '../services/cmsApi'

const AdminAuthContext = createContext(null)

function readSession() {
  try {
    if (useCmsApi) {
      return Boolean(sessionStorage.getItem('dosh_admin_token'))
    }
    return sessionStorage.getItem(AUTH_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession)

  const login = useCallback(async (username, password) => {
    if (useCmsApi) {
      try {
        await loginAdmin(username, password)
        setIsAuthenticated(true)
        return true
      } catch {
        setAdminToken(null)
        setIsAuthenticated(false)
        return false
      }
    }
    const ok =
      username.trim() === adminCredentials.username &&
      password === adminCredentials.password
    if (ok) {
      sessionStorage.setItem(AUTH_SESSION_KEY, '1')
      setIsAuthenticated(true)
    }
    return ok
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_SESSION_KEY)
    setAdminToken(null)
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth debe usarse dentro de AdminAuthProvider')
  return ctx
}
