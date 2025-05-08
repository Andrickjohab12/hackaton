import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, MapPin, Phone, Star, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from a database or API
  const doctor = {
    name: "Dr. Carlos Méndez",
    email: "carlos.mendez@sonaid.med",
    specialty: "Oncología Mamaria",
    imageUrl: "/placeholder.svg?height=128&width=128",
    location: "Hospital Universitario Central",
    phone: "+52 55 1234 5678",
    joinDate: "Enero 2020",
    bio: "Especialista en diagnóstico por imagen con más de 10 años de experiencia en oncología mamaria. Certificado por el Consejo Mexicano de Radiología e Imagen.",
    stats: {
      casesAnalyzed: 1248,
      accuracyRate: "96.5%",
      averageResponseTime: "24h",
    },
    recentActivity: [
      {
        id: "act1",
        type: "Caso analizado",
        patient: "María García",
        date: "12 mayo, 2023",
        status: "Completado",
      },
      {
        id: "act2",
        type: "Caso compartido",
        patient: "Juan Rodríguez",
        date: "10 mayo, 2023",
        status: "En revisión",
      },
      {
        id: "act3",
        type: "Nuevo caso",
        patient: "Laura Pérez",
        date: "8 mayo, 2023",
        status: "Pendiente",
      },
    ],
    certifications: [
      "Especialidad en Radiología e Imagen, UNAM",
      "Subespecialidad en Imagen Mamaria, Instituto Nacional de Cancerología",
      "Certificación en Diagnóstico Asistido por IA, Stanford University",
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar - Simplified version, in a real app you'd reuse the main navbar */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-red-600">SONAID</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Volver al Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={doctor.imageUrl || "/placeholder.svg"} alt={doctor.name} />
                    <AvatarFallback className="text-2xl">CM</AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-bold">{doctor.name}</h2>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>

                  <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{doctor.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{doctor.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span>Miembro desde {doctor.joinDate}</span>
                    </div>
                  </div>

                  <div className="mt-6 w-full">
                    <Link href="/configuracion">
                      <Button className="w-full bg-red-600 hover:bg-red-700">Editar Perfil</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Certificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {doctor.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="mr-2 h-4 w-4 shrink-0 text-yellow-500" />
                      <span className="text-sm">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Biografía Profesional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{doctor.bio}</p>
                  </CardContent>
                </Card>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Casos Analizados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{doctor.stats.casesAnalyzed}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Tasa de Precisión</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{doctor.stats.accuracyRate}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Tiempo de Respuesta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{doctor.stats.averageResponseTime}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Actividad Reciente</CardTitle>
                    <CardDescription>Historial de los últimos casos y acciones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {doctor.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                            <User className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.type}</p>
                            <p className="text-sm text-gray-500">
                              Paciente: {activity.patient} • {activity.date}
                            </p>
                            <p
                              className={`mt-1 text-xs font-medium ${
                                activity.status === "Completado"
                                  ? "text-green-600"
                                  : activity.status === "En revisión"
                                    ? "text-blue-600"
                                    : "text-yellow-600"
                              }`}
                            >
                              {activity.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
