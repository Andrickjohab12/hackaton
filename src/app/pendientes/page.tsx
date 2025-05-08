import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"

// Mock data for pending cases
const pendingCases = [
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
    waitingTime: "3 días",
    priority: "Alta",
    priorityColor: "red",
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
    waitingTime: "14 días",
    priority: "Media",
    priorityColor: "yellow",
    imageCount: 2,
  },
  {
    id: "PC-009",
    patient: {
      initials: "FT",
      name: "Fernando Torres",
      age: 58,
      gender: "Masculino",
    },
    department: "Cardiología",
    createdAt: "2023-05-15",
    waitingTime: "1 día",
    priority: "Baja",
    priorityColor: "green",
    imageCount: 2,
  },
  {
    id: "PC-012",
    patient: {
      initials: "RM",
      name: "Rosa Martínez",
      age: 65,
      gender: "Femenino",
    },
    department: "Medicina General",
    createdAt: "2023-05-10",
    waitingTime: "5 días",
    priority: "Media",
    priorityColor: "yellow",
    imageCount: 1,
  },
]

export default function PendingCasesPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Casos Pendientes de Revisión</h1>
          <p className="text-gray-500">Casos que requieren tu atención y diagnóstico</p>
        </div>

        <div className="grid gap-6">
          {pendingCases.map((caseItem) => (
            <Card key={caseItem.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Patient info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-lg font-medium text-red-600">
                        {caseItem.patient.initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{caseItem.patient.name}</h3>
                        <p className="text-sm text-gray-500">
                          {caseItem.patient.age} años, {caseItem.patient.gender}
                        </p>
                        <p className="mt-1 text-sm font-medium">{caseItem.department}</p>
                        <div className="mt-2 flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">En espera: {caseItem.waitingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Status and actions */}
                  <div className="flex flex-col justify-between border-t bg-gray-50 p-6 md:border-l md:border-t-0">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <Badge
                          className={`bg-${caseItem.priorityColor}-100 text-${caseItem.priorityColor}-700 hover:bg-${caseItem.priorityColor}-100`}
                        >
                          Prioridad {caseItem.priority}
                        </Badge>
                        <span className="text-sm text-gray-500">ID: {caseItem.id}</span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-medium">Detalles del caso:</p>
                        <ul className="mt-1 space-y-1 text-sm text-gray-500">
                          <li>• Fecha de creación: {caseItem.createdAt}</li>
                          <li>• Imágenes disponibles: {caseItem.imageCount}</li>
                          <li>• Estado: Pendiente de revisión</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link href={`/casos/${caseItem.id}`}>
                        <Button className="bg-red-600 hover:bg-red-700">Revisar Caso</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pendingCases.length === 0 && (
          <Card className="p-8 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
            <h3 className="mt-4 text-lg font-medium">No hay casos pendientes</h3>
            <p className="mt-2 text-gray-500">Todos los casos han sido revisados.</p>
          </Card>
        )}
      </main>
    </div>
  )
}
