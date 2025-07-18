import { ref } from 'vue'
export const token = ref<string | null>(null)

export const sessionUser = ref<SessionUser | null>(null)

interface SessionUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  avatar_url: string | null
}

export function loadUserFromLocalStorage() {
  const rawUser = localStorage.getItem('user')
  const rawToken = localStorage.getItem('token')

  token.value = rawToken && rawToken.trim() !== '' ? rawToken : null

  if (token.value && rawUser) {
    try {
      const parsedUser = JSON.parse(rawUser)

      if (
        typeof parsedUser.id === 'number' &&
        typeof parsedUser.username === 'string' &&
        typeof parsedUser.email === 'string' &&
        typeof parsedUser.first_name === 'string' &&
        typeof parsedUser.last_name === 'string'
      ) {
        sessionUser.value = parsedUser
        return
      }
    } catch (e) {
      console.warn('Erreur de parsing JSON pour "user":', e)
    }
  }

  sessionUser.value = null
}

export function saveUserToLocalStorage() {
  localStorage.setItem('user', JSON.stringify(sessionUser.value))
  localStorage.setItem('token', token.value || '')
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  sessionUser.value = null
}
