import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { adminCredentials, AUTH_SESSION_KEY } from '../config/authConfig'

const AdminAuthContext = createContext(null)

function readSession() {
  try {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession)

  const login = useCallback((username, password) => {
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
