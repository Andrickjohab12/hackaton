import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Diagnosia - Aplicación Médica de Ultrasonido con IA",
  description: "Plataforma para análisis de ultrasonidos con inteligencia artificial",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
          <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
