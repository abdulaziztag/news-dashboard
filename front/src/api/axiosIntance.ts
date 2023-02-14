import { BASE_URL } from './endpoints'
import axios from 'axios'
import { getToken } from '../helpers/token'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers ?? {}

  const { token } = getToken()

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export default axiosInstance
