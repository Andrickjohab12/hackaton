"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"

// Mock data for all cases
const allCases = [
  {
    id: "PC-001",
    patient: {
      initials: "MG",
      name: "María García",
      age: 42,
      gender: "Femenino",
    },
    department: "Oncología Mamaria",
    createdAt: "2023-05-12",
    status: "Pendiente",
    statusColor: "yellow",
    doctor: "Dr. Carlos Méndez",
    imageCount: 3,
  },
  {
    id: "PC-002",
    patient: {
      initials: "JR",
      name: "Juan Rodríguez",
      age: 56,
      gender: "Masculino",
    },
    department: "Cardiología",
    createdAt: "2023-05-10",
    status: "Completado",
    statusColor: "green",
    doctor: "Dr. Carlos Méndez",
    imageCount: 2,
  },
  {
    id: "PC-003",
    patient: {
      initials: "LP",
      name: "Laura Pérez",
      age: 35,
      gender: "Femenino",
    },
    department: "Obstetricia",
    createdAt: "2023-05-08",
    status: "En Revisión",
    statusColor: "blue",
    doctor: "Dr. Ana Martínez",
    imageCount: 4,
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
    createdAt: "2023-05-05",
    status: "Alerta",
    statusColor: "red",
    doctor: "Dr. Carlos Méndez",
    imageCount: 2,
  },
  {
    id: "PC-005",
    patient: {
      initials: "RG",
      name: "Roberto Gómez",
      age: 62,
      gender: "Masculino",
    },
    department: "Cardiología",
    createdAt: "2023-05-03",
    status: "Completado",
    statusColor: "green",
    doctor: "Dr. Luis Ramírez",
    imageCount: 3,
  },
  {
    id: "PC-006",
    patient: {
      initials: "CM",
      name: "Carmen Morales",
      age: 39,
      gender: "Femenino",
    },
    department: "Oncología Mamaria",
    createdAt: "2023-05-01",
    status: "Pendiente",
    statusColor: "yellow",
    doctor: "Dr. Carlos Méndez",
    imageCount: 2,
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
    createdAt: "2023-04-28",
    status: "Completado",
    statusColor: "green",
    doctor: "Dr. Ana Martínez",
    imageCount: 1,
  },
  {
    id: "PC-008",
    patient: {
      initials: "EV",
      name: "Elena Vázquez",
      age: 45,
      gender: "Femenino",
    },
    department: "Oncología Mamaria",
    createdAt: "2023-04-25",
    status: "Completado",
    statusColor: "green",
    doctor: "Dr. Carlos Méndez",
    imageCount: 3,
  },
]

export default function AllCasesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter cases based on search term
  const filteredCases = allCases.filter(
    (caseItem) =>
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Total de Casos</h1>
          <p className="text-gray-500">Visualiza y gestiona todos los casos en el sistema</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Todos los Casos</CardTitle>
                <CardDescription>
                  Mostrando {filteredCases.length} de {allCases.length} casos
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar casos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-500">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Paciente</th>
                    <th className="px-4 py-3">Departamento</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Imágenes</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.length > 0 ? (
                    filteredCases.map((caseItem) => (
                      <tr key={caseItem.id} className="border-b text-sm hover:bg-gray-50">
                        <td className="px-4 py-4 font-medium">{caseItem.id}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600">
                              {caseItem.patient.initials}
                            </div>
                            <div>
                              <p className="font-medium">{caseItem.patient.name}</p>
                              <p className="text-xs text-gray-500">
                                {caseItem.patient.age} años, {caseItem.patient.gender}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">{caseItem.department}</td>
                        <td className="px-4 py-4">{caseItem.createdAt}</td>
                        <td className="px-4 py-4">
                          <Badge
                            className={`bg-${caseItem.statusColor}-100 text-${caseItem.statusColor}-700 hover:bg-${caseItem.statusColor}-100`}
                          >
                            {caseItem.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">{caseItem.doctor}</td>
                        <td className="px-4 py-4">{caseItem.imageCount}</td>
                        <td className="px-4 py-4 text-right">
                          <Link href={`/casos/${caseItem.id}`}>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center">
                        No se encontraron casos que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
