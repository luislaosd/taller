/** Credenciales demo (maqueta). En producción real: solo backend + hash. */
export const adminCredentials = {
  username: import.meta.env.VITE_ADMIN_USER || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'DoshMotor2026',
}

export const AUTH_SESSION_KEY = 'dosh_admin_session'
