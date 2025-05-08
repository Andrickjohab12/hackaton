import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const patientCases = [
  {
    id: "PC-001",
    patient: {
      initials: "MG",
      name: "María García",
      age: 42,
      gender: "Femenino",
    },
    sharedWith: ["Dr. López", "Dr. Ramírez"],
    department: "Oncología Mamaria",
    createdAt: "2023-05-12",
    status: "Pendiente",
    statusColor: "yellow",
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
    sharedWith: ["Dr. Martínez"],
    department: "Cardiología",
    createdAt: "2023-05-10",
    status: "Completado",
    statusColor: "green",
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
    sharedWith: ["Dr. Sánchez", "Dr. Gómez", "Dr. Torres"],
    department: "Obstetricia",
    createdAt: "2023-05-08",
    status: "En Revisión",
    statusColor: "blue",
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
    sharedWith: ["Dr. Ramírez"],
    department: "Oncología Mamaria",
    createdAt: "2023-05-05",
    status: "Alerta",
    statusColor: "red",
    imageCount: 2,
  },
]

export function PatientCasesList() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left text-sm font-medium text-gray-500">
            <th className="px-4 py-3">Paciente</th>
            <th className="px-4 py-3">Compartido con</th>
            <th className="px-4 py-3">Departamento</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Imágenes</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patientCases.map((caseItem) => (
            <tr key={caseItem.id} className="border-b text-sm hover:bg-gray-50">
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
              <td className="px-4 py-4">
                <div className="flex -space-x-2">
                  {caseItem.sharedWith.slice(0, 3).map((doctor, index) => (
                    <div
                      key={index}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white"
                      title={doctor}
                    >
                      {doctor.split(" ")[0][0]}
                      {doctor.split(" ")[1][0]}
                    </div>
                  ))}
                  {caseItem.sharedWith.length > 3 && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white">
                      +{caseItem.sharedWith.length - 3}
                    </div>
                  )}
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
              <td className="px-4 py-4">{caseItem.imageCount}</td>
              <td className="px-4 py-4 text-right">
                <Link href={`/casos/${caseItem.id}`}>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
