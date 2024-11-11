'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import axios from '../config/axios'

interface User {
  id: string
  username: string
}

interface AuthTokens {
  access_token: string
  refresh_token: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const tokensRef = useRef<AuthTokens | null>(null)

  const saveTokens = useCallback((newTokens: AuthTokens) => {
    localStorage.setItem('auth_tokens', JSON.stringify(newTokens))
    tokensRef.current = newTokens
  }, [])

  const clearTokens = useCallback(() => {
    localStorage.removeItem('auth_tokens')
    tokensRef.current = null
  }, [])

  useEffect(() => {
    const storedTokens = localStorage.getItem('auth_tokens')
    if (storedTokens) {
      tokensRef.current = JSON.parse(storedTokens)
    }
    setLoading(false)
  }, [])

  const refreshTokens = useCallback(async () => {
    if (!tokensRef.current) throw new Error('No refresh token available')
    try {
      const response = await axios.post('/auth/refresh', {
        refresh_token: tokensRef.current.refresh_token
      })
      saveTokens(response.data)
      return response.data.access_token
    } catch (error) {
      console.error('Token refresh failed', error)
      clearTokens()
      throw error
    }
  }, [saveTokens, clearTokens])

  const fetchUser = useCallback(async () => {
    if (!tokensRef.current) return

    try {
      const response = await axios.get('/user/profile', {
        headers: { Authorization: `Bearer ${tokensRef.current.access_token}` }
      })
      console.log(response.data)
      setUser(response.data)
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshTokens()
          const retryResponse = await axios.get('/user/profile', {
            headers: { Authorization: `Bearer ${newAccessToken}` }
          })
          setUser(retryResponse.data)
          console.log(retryResponse.data)
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError)
          clearTokens()
          setUser(null)
        }
      } else {
        console.error('Failed to fetch user', error)
        setUser(null)
      }
    }
  }, [refreshTokens, clearTokens])

  useEffect(() => {
    if (tokensRef.current) {
      fetchUser()
    } else {
      setUser(null)
    }
  }, [fetchUser])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth/login', { email, password })
      saveTokens(response.data)
      await fetchUser()
    } catch (error) {
      console.error('Login failed', error)
      throw new Error('Login failed')
    }
  }, [saveTokens, fetchUser])

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post('/auth/register', { username, email, password })
      saveTokens(response.data)
      await fetchUser()
    } catch (error) {
      console.error('Registration failed', error)
      throw new Error('Registration failed')
    }
  }, [saveTokens, fetchUser])

  const logout = useCallback(() => {
    clearTokens()
    setUser(null)
  }, [clearTokens])

  const handleGoogleLogin = useCallback(() => {
    window.location.href = 'https://job-tracker-backend-x.vercel.app/api/auth/google'
  }, [])

  const handleGithubLogin = useCallback(() => {
    window.location.href = 'https://job-tracker-backend-x.vercel.app/api/auth/github'
  }, [])

  return {
    user,
    loading,
    login,
    register,
    logout,
    refreshTokens,
    tokens: tokensRef.current,
    handleGithubLogin,
    handleGoogleLogin
  }
}