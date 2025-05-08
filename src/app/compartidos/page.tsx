"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Share2, Calendar, Search } from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"

// Mock data for shared cases
const sharedCases = [
  {
    id: "PC-003",
    patient: {
      initials: "LP",
      name: "Laura Pérez",
      age: 35,
      gender: "Femenino",
    },
    department: "Obstetricia",
    createdAt: "8 mayo, 2023",
    status: "En Revisión",
    statusColor: "blue",
    sharedWith: [
      { name: "Dr. Carlos Méndez", specialty: "Oncología Mamaria" },
      { name: "Dr. Ana Martínez", specialty: "Obstetricia" },
      { name: "Dr. Luis Ramírez", specialty: "Radiología" },
    ],
    sharedBy: "Dr. Sofía Torres",
    notes: "Caso complejo que requiere opinión de especialistas en diferentes áreas.",
  },
  {
    id: "PC-004",
    patient: {
      initials: "AS",
      name: "Ana Sánchez",
      age: 48,
      gender: "Femenino",
    },
    department: "Oncología Mamaria",
    createdAt: "5 mayo, 2023",
    status: "Alerta",
    statusColor: "red",
    sharedWith: [
      { name: "Dr. Carlos Méndez", specialty: "Oncología Mamaria" },
      { name: "Dr. Luis Ramírez", specialty: "Radiología" },
    ],
    sharedBy: "Dr. Ana Martínez",
    notes: "Posible hallazgo que requiere segunda opinión urgente.",
  },
  {
    id: "PC-007",
    patient: {
      initials: "JL",
      name: "José López",
      age: 51,
      gender: "Masculino",
    },
    department: "Medicina General",
    createdAt: "28 abril, 2023",
    status: "Completado",
    statusColor: "green",
    sharedWith: [
      { name: "Dr. Carlos Méndez", specialty: "Oncología Mamaria" },
      { name: "Dr. Ana Martínez", specialty: "Obstetricia" },
    ],
    sharedBy: "Dr. Roberto Sánchez",
    notes: "Caso de seguimiento para evaluación multidisciplinaria.",
  },
  {
    id: "PC-010",
    patient: {
      initials: "MR",
      name: "Miguel Ramírez",
      age: 62,
      gender: "Masculino",
    },
    department: "Cardiología",
    createdAt: "20 abril, 2023",
    status: "Completado",
    statusColor: "green",
    sharedWith: [
      { name: "Dr. Carlos Méndez", specialty: "Oncología Mamaria" },
      { name: "Dr. Luis Ramírez", specialty: "Radiología" },
      { name: "Dr. Roberto Sánchez", specialty: "Cardiología" },
    ],
    sharedBy: "Dr. Ana Martínez",
    notes: "Caso de interés académico para discusión en junta médica.",
  },
]

export default function SharedCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter cases based on search term
  const filteredCases = sharedCases.filter(
    (caseItem) =>
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.sharedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.sharedWith.some(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
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
            <h1 className="text-3xl font-bold text-gray-900">Casos Compartidos</h1>
            <p className="text-gray-500">Casos compartidos con otros médicos para colaboración</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar casos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
              <Card key={caseItem.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
                    {/* Left column - Case info */}
                    <div className="flex-1">
                      <div className="flex items-start">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-lg font-medium text-red-600">
                          {caseItem.patient.initials}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-bold">{caseItem.patient.name}</h3>
                            <Badge
                              className={`ml-3 bg-${caseItem.statusColor}-100 text-${caseItem.statusColor}-700 hover:bg-${caseItem.statusColor}-100`}
                            >
                              {caseItem.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {caseItem.patient.age} años, {caseItem.patient.gender}
                          </p>
                          <p className="mt-1 text-sm font-medium">{caseItem.department}</p>
                          <div className="mt-2 flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">Fecha: {caseItem.createdAt}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium">Notas de compartición:</p>
                        <p className="mt-1 text-sm text-gray-600">{caseItem.notes}</p>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium">Compartido por:</p>
                        <p className="mt-1 text-sm text-gray-600">{caseItem.sharedBy}</p>
                      </div>
                    </div>

                    {/* Right column - Shared with */}
                    <div className="lg:w-1/3">
                      <div className="rounded-lg border p-4">
                        <div className="mb-3 flex items-center">
                          <Share2 className="mr-2 h-5 w-5 text-gray-500" />
                          <h4 className="font-medium">Compartido con</h4>
                        </div>
                        <div className="space-y-3">
                          {caseItem.sharedWith.map((doctor, index) => (
                            <div key={index} className="flex items-start">
                              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                                {doctor.name.split(" ")[0][0]}
                                {doctor.name.split(" ")[1][0]}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{doctor.name}</p>
                                <p className="text-xs text-gray-500">{doctor.specialty}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Link href={`/casos/${caseItem.id}`}>
                          <Button className="bg-red-600 hover:bg-red-700">Ver Detalles</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <p>No se encontraron casos compartidos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
