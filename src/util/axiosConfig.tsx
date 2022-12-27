import axios from 'axios'
import { signIn } from 'next-auth/react'

const instance = axios.create()

const setToken = async (token: string) =>
  token && (instance.defaults.headers.common['accessToken'] = token)

instance.defaults.headers.put['Accept'] = 'application/json'
instance.defaults.headers.put['Content-Type'] = 'application/json'
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.post['Accept'] = 'application/json'

instance.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data
    }
    return Promise.reject(response)
  },
  function (error) {
    if (error.response.status === 500) return { error: 'error 500' }
    if (error.response.status === 401) return signIn('jasmine')
    return Promise.reject(error)
  }
)

const apiCall = instance

export { apiCall, setToken }
