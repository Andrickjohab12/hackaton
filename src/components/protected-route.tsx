"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If not authenticated and not already on the login page, redirect to login
    if (!isAuthenticated && pathname !== "/login") {
      router.push("/login")
    }
  }, [isAuthenticated, router, pathname])

  // If not authenticated, don't render children
  if (!isAuthenticated && pathname !== "/login") {
    return null
  }

  // Otherwise, render the children
  return <>{children}</>
}
