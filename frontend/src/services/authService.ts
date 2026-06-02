import api from './api'
import type { AuthResponse, LoginPayload } from '../types/auth'

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post('/auth/login', payload)
  return res.data
}

export const signup = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post('/auth/signup', payload)
  return res.data
}