"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Check } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/components/auth-provider"

export default function SettingsPage() {
  const { user } = useAuth()

  // Mock user data - in a real app, this would come from a database or API
  const [doctor, setDoctor] = useState({
    name: user?.name || "Dr. Carlos Méndez",
    email: user?.email || "carlos.mendez@diagnosia.med",
    specialty: "oncologia-mamaria",
    imageUrl: "/placeholder.svg?height=128&width=128",
    location: "Hospital Universitario Central",
    phone: "+52 55 1234 5678",
    bio: "Especialista en diagnóstico por imagen con más de 10 años de experiencia en oncología mamaria. Certificado por el Consejo Mexicano de Radiología e Imagen.",
  })

  const [notifications, setNotifications] = useState({
    newCases: true,
    caseUpdates: true,
    aiResults: true,
    systemUpdates: false,
    emailDigest: true,
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to a database or API
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const initials = getInitials(doctor.name)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Navbar - Simplified version, in a real app you'd reuse the main navbar */}
        <header className="border-b border-gray-100 bg-white">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-red-600">Diagnosia</span>
            </Link>
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Volver al Dashboard
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
            <p className="text-gray-500">Administra tu perfil y preferencias</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información de perfil</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={doctor.imageUrl || "/placeholder.svg"} alt={doctor.name} />
                        <AvatarFallback className="bg-red-100 text-xl text-red-600">{initials}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Cambiar Foto
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input
                        id="name"
                        value={doctor.name}
                        onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={doctor.email}
                        onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={doctor.phone}
                        onChange={(e) => setDoctor({ ...doctor, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty">Especialidad</Label>
                      <Select
                        value={doctor.specialty}
                        onValueChange={(value) => setDoctor({ ...doctor, specialty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiologia">Cardiología</SelectItem>
                          <SelectItem value="obstetricia">Obstetricia</SelectItem>
                          <SelectItem value="oncologia-mamaria">Oncología Mamaria</SelectItem>
                          <SelectItem value="radiologia">Radiología</SelectItem>
                          <SelectItem value="medicina-general">Medicina General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Información Profesional</CardTitle>
                    <CardDescription>Actualiza tu información profesional</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Centro Médico / Hospital</Label>
                      <Input
                        id="location"
                        value={doctor.location}
                        onChange={(e) => setDoctor({ ...doctor, location: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía Profesional</Label>
                      <Textarea
                        id="bio"
                        rows={6}
                        value={doctor.bio}
                        onChange={(e) => setDoctor({ ...doctor, bio: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={handleSave}>
                      {saved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Guardado
                        </>
                      ) : (
                        "Guardar Cambios"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Notificaciones</CardTitle>
                  <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notificaciones en la Aplicación</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="newCases">Nuevos Casos</Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones cuando se asignen nuevos casos
                          </p>
                        </div>
                        <Switch
                          id="newCases"
                          checked={notifications.newCases}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, newCases: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="caseUpdates">Actualizaciones de Casos</Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones cuando haya actualizaciones en tus casos
                          </p>
                        </div>
                        <Switch
                          id="caseUpdates"
                          checked={notifications.caseUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, caseUpdates: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="aiResults">Resultados de IA</Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones cuando la IA complete el análisis de un caso
                          </p>
                        </div>
                        <Switch
                          id="aiResults"
                          checked={notifications.aiResults}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, aiResults: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="systemUpdates">Actualizaciones del Sistema</Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones sobre actualizaciones y nuevas funciones
                          </p>
                        </div>
                        <Switch
                          id="systemUpdates"
                          checked={notifications.systemUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notificaciones por Correo</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailDigest">Resumen Diario</Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe un resumen diario de tus casos y actividades pendientes
                          </p>
                        </div>
                        <Switch
                          id="emailDigest"
                          checked={notifications.emailDigest}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, emailDigest: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto bg-red-600 hover:bg-red-700" onClick={handleSave}>
                    {saved ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Guardado
                      </>
                    ) : (
                      "Guardar Preferencias"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cambiar Contraseña</CardTitle>
                    <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña Actual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva Contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto bg-red-600 hover:bg-red-700">Actualizar Contraseña</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Seguridad de la Cuenta</CardTitle>
                    <CardDescription>Configura opciones adicionales de seguridad</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="twoFactor">Autenticación de Dos Factores</Label>
                        <p className="text-sm text-muted-foreground">
                          Añade una capa adicional de seguridad a tu cuenta
                        </p>
                      </div>
                      <Switch
                        id="twoFactor"
                        checked={security.twoFactor}
                        onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Tiempo de Inactividad</Label>
                      <p className="text-sm text-muted-foreground">
                        Cierra la sesión automáticamente después de un período de inactividad
                      </p>
                      <Select
                        value={security.sessionTimeout}
                        onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tiempo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="60">1 hora</SelectItem>
                          <SelectItem value="120">2 horas</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto bg-red-600 hover:bg-red-700" onClick={handleSave}>
                      {saved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Guardado
                        </>
                      ) : (
                        "Guardar Configuración"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  )
}
