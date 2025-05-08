import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Upload, Users } from "lucide-react"
import Link from "next/link"
import { DashboardMetricCard } from "@/components/dashboard-metric-card"
import { PatientCasesList } from "@/components/patient-cases-list"
import { NewCaseModal } from "@/components/new-case-modal"
import { UserNav } from "@/components/user-nav"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-red-600">SONAID</span>
          </Link>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Casos de Pacientes SONAID</h1>
          <NewCaseModal>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Caso
            </Button>
          </NewCaseModal>
        </div>

        {/* Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardMetricCard
            title="Total de Casos"
            value="124"
            delta="+12% esta semana"
            icon={<Users className="h-5 w-5 text-red-600" />}
            linkText="Ver todos"
            linkHref="/casos"
          />
          <DashboardMetricCard
            title="Pendientes de Revisión"
            value="8"
            delta="-3% esta semana"
            icon={<Upload className="h-5 w-5 text-yellow-500" />}
            linkText="Ver pendientes"
            linkHref="/pendientes"
          />
          <DashboardMetricCard
            title="Ultrasonidos Recientes"
            value="32"
            delta="+5% esta semana"
            icon={<Upload className="h-5 w-5 text-green-500" />}
            linkText="Ver recientes"
            linkHref="/recientes"
          />
          <DashboardMetricCard
            title="Casos Compartidos"
            value="16"
            delta="+2% esta semana"
            icon={<Users className="h-5 w-5 text-blue-500" />}
            linkText="Ver compartidos"
            linkHref="/compartidos"
          />
        </div>

        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Casos Recientes</CardTitle>
            <CardDescription>Lista de los casos más recientes en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <PatientCasesList />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
