import axios from 'axios'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
export const backendServiceUrl = NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: backendServiceUrl
})

// todo: think about how to handle this, for now, add it to every request
function setAuthToken(token: String | null) {
  if (token) {
    // Apply for every request
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    // Delete auth header
    delete api.defaults.headers.common['Authorization']
  }
}

export { api }
