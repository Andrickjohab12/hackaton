"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Download, Eye, Calendar, Search } from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"

// Mock data for recent ultrasounds
const recentUltrasounds = [
  {
    id: "US-001",
    patientName: "María García",
    date: "12 mayo, 2023",
    department: "Oncología Mamaria",
    imageUrl: "/placeholder.svg?height=300&width=400",
    caseId: "PC-001",
  },
  {
    id: "US-002",
    patientName: "Juan Rodríguez",
    date: "10 mayo, 2023",
    department: "Cardiología",
    imageUrl: "/placeholder.svg?height=300&width=400",
    caseId: "PC-002",
  },
  {
    id: "US-003",
    patientName: "Laura Pérez",
    date: "8 mayo, 2023",
    department: "Obstetricia",
    imageUrl: "/placeholder.svg?height=300&width=400",
    caseId: "PC-003",
  },
  {
    id: "US-004",
    patientName: "Ana Sánchez",
    date: "5 mayo, 2023",
    department: "Oncología Mamaria",
    imageUrl: "/placeholder.svg?height=300&width=400",
    caseId: "PC-004",
  },
  {
    id: "US-005",
    patientName: "Roberto Gómez",
    date: "3 mayo, 2023",
    department: "Cardiología",
    imageUrl: "/placeholder.svg?height=300&width=400",
    caseId: "PC-005",
  },
  {
    id: "US-006",
    patientName: "Carmen Morales",
    date: "1 mayo, 2023",
    department: "Oncología Mamaria",
    imageUrl: "/placeholder.svg?height=300&width=400",
    caseId: "PC-006",
  },
]

export default function RecentUltrasoundsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter ultrasounds based on search term
  const filteredUltrasounds = recentUltrasounds.filter(
    (ultrasound) =>
      ultrasound.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ultrasound.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ultrasound.date.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <span className="text-xl font-bold text-red-600">SONAID</span>
            </Link>
            <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver al Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ultrasonidos Recientes</h1>
            <p className="text-gray-500">Galería de imágenes de ultrasonido subidas recientemente</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por paciente..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredUltrasounds.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUltrasounds.map((ultrasound) => (
              <Card key={ultrasound.id} className="overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={ultrasound.imageUrl || "/placeholder.svg"}
                    alt={`Ultrasonido de ${ultrasound.patientName}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold">{ultrasound.patientName}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {ultrasound.date}
                  </div>
                  <p className="mt-1 text-sm">{ultrasound.department}</p>
                  <div className="mt-4 flex justify-between">
                    <Link href={`/casos/${ultrasound.caseId}`}>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        Ver Caso
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Download className="mr-1 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border p-8 text-center">
            <p>No se encontraron imágenes que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>
    </div>
  )
}
