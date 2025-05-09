"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type AuthContextType = {
  isAuthenticated: boolean
  login: (username: string, password: string) => void
  logout: () => void
  user: {
    name: string
    email: string
    role: string
  } | null
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthContextType["user"]>(null)
  const router = useRouter()

  // Check if user is already authenticated on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("diagnosia-auth")
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth)
        setIsAuthenticated(true)
        setUser(authData.user)
      } catch (error) {
        console.error("Error parsing auth data:", error)
        localStorage.removeItem("diagnosia-auth")
      }
    }
  }, [])

  const login = (username: string, password: string) => {
    // In a real app, you would validate credentials against a backend
    // For this demo, we'll accept any non-empty username/password
    if (username.trim() && password.trim()) {
      // Create a mock user based on the username
      const mockUser = {
        name: username.includes("@") ? username.split("@")[0] : username,
        email: username.includes("@") ? username : `${username}@diagnosia.med`,
        role: "Doctor",
      }

      // Set authentication state
      setIsAuthenticated(true)
      setUser(mockUser)

      // Store auth state in localStorage
      localStorage.setItem(
        "diagnosia-auth",
        JSON.stringify({
          isAuthenticated: true,
          user: mockUser,
        }),
      )

      // Redirect to dashboard
      router.push("/")
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("diagnosia-auth")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>{children}</AuthContext.Provider>
}
