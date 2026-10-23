import { API_URL, ADMIN_TOKEN_KEY } from '../config/apiConfig'

function getToken() {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY)
  } catch {
    return null
  }
}

export function setAdminToken(token) {
  if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
  else sessionStorage.removeItem(ADMIN_TOKEN_KEY)
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || err.message || `HTTP ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export async function fetchPublicContent() {
  return request('/api/content')
}

export async function loginAdmin(username, password) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  setAdminToken(data.access_token)
  return data
}

export async function updateContactApi(contact) {
  return request('/api/admin/contact', { method: 'PUT', body: JSON.stringify(contact) })
}

export async function updateSectionApi(sectionKey, data) {
  return request(`/api/admin/sections/${sectionKey}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  })
}

export async function createServiceApi(service) {
  return request('/api/admin/services', {
    method: 'POST',
    body: JSON.stringify({
      slug: service.slug,
      title: service.title,
      excerpt: service.excerpt,
      body: service.body,
      image: service.image,
      sortOrder: service.sortOrder ?? 0,
      isActive: service.isActive !== false,
    }),
  })
}

export async function updateServiceApi(id, service) {
  return request(`/api/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      slug: service.slug,
      title: service.title,
      excerpt: service.excerpt,
      body: service.body,
      image: service.image,
      sortOrder: service.sortOrder,
      isActive: service.isActive,
    }),
  })
}

export async function deleteServiceApi(id) {
  return request(`/api/admin/services/${id}`, { method: 'DELETE' })
}

/** Sincroniza lista completa de servicios con la API (altas, ediciones, bajas). */
export async function syncServicesApi(services) {
  const server = await request('/api/admin/content')
  const serverList = server.services || []
  const serverIds = new Set(serverList.map((s) => s.id))
  const nextIds = new Set()

  const result = []
  for (const s of services) {
    const isDbId = typeof s.id === 'number' && s.id > 0 && s.id < 1_000_000_000
    if (isDbId && serverIds.has(s.id)) {
      const updated = await updateServiceApi(s.id, s)
      result.push(updated)
      nextIds.add(s.id)
    } else {
      const created = await createServiceApi(s)
      result.push(created)
      nextIds.add(created.id)
    }
  }
  for (const id of serverIds) {
    if (!services.some((s) => s.id === id)) {
      await deleteServiceApi(id)
    }
  }
  return result
}
