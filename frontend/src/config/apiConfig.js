export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
export const ADMIN_TOKEN_KEY = 'dosh_admin_token'
export const useCmsApi = Boolean(API_URL)
