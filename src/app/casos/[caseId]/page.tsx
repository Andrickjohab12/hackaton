"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { PdfDownloadButton } from "@/components/pdf-download-button"
import { ProtectedRoute } from "@/components/protected-route"
import { useRef } from "react"

// Mock database for cases
const casesDatabase = {
  "PC-001": {
    id: "PC-001",
    patient: {
      initials: "MG",
      name: "María García",
      age: 42,
      gender: "Femenino",
      email: "maria.garcia@email.com",
      phone: "+52 55 1234 5678",
      address: "Av. Insurgentes Sur 1234, Ciudad de México",
      insurance: "Seguros Médicos Nacional",
      policyNumber: "SM-123456789",
    },
    department: "Oncología Mamaria",
    doctor: "Dr. Carlos Méndez",
    createdAt: "2023-05-12",
    updatedAt: "2023-05-15",
    status: "Pendiente",
    statusColor: "yellow",
    priority: "Alta",
    priorityColor: "red",
    waitingTime: "3 días",
    history:
      "Paciente con antecedentes familiares de cáncer de mama. Acude por nódulo palpable en mama izquierda de aproximadamente 2 meses de evolución.",
    symptoms:
      "Dolor ocasional en mama izquierda, nódulo palpable de aproximadamente 1.5 cm en cuadrante superior externo.",
    diagnosis: null,
    treatment: null,
    notes:
      "Se solicita ultrasonido para valoración de nódulo mamario. Pendiente resultado de IA para análisis complementario.",
    ultrasounds: [
      {
        id: "US-001-1",
        date: "2023-05-12",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido de mama izquierda, vista transversal",
        findings: "Pendiente análisis",
      },
      {
        id: "US-001-2",
        date: "2023-05-12",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido de mama izquierda, vista longitudinal",
        findings: "Pendiente análisis",
      },
      {
        id: "US-001-3",
        date: "2023-05-12",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido de mama derecha, vista comparativa",
        findings: "Pendiente análisis",
      },
    ],
    sharedWith: [
      { name: "Dr. Ana Martínez", specialty: "Oncología", email: "ana.martinez@hospital.med" },
      { name: "Dr. Luis Ramírez", specialty: "Radiología", email: "luis.ramirez@hospital.med" },
    ],
    aiAnalysis: null,
    timeline: [
      { date: "2023-05-12 09:30", event: "Caso creado", user: "Dr. Carlos Méndez" },
      { date: "2023-05-12 09:45", event: "Imágenes de ultrasonido subidas", user: "Dr. Carlos Méndez" },
      {
        date: "2023-05-12 10:00",
        event: "Caso compartido con Dr. Ana Martínez y Dr. Luis Ramírez",
        user: "Dr. Carlos Méndez",
      },
      { date: "2023-05-13 14:20", event: "Visualizado por Dr. Ana Martínez", user: "Dr. Ana Martínez" },
      { date: "2023-05-15 11:15", event: "Visualizado por Dr. Luis Ramírez", user: "Dr. Luis Ramírez" },
    ],
  },
  "PC-002": {
    id: "PC-002",
    patient: {
      initials: "JR",
      name: "Juan Rodríguez",
      age: 56,
      gender: "Masculino",
      email: "juan.rodriguez@email.com",
      phone: "+52 55 8765 4321",
      address: "Calle Reforma 567, Guadalajara, Jalisco",
      insurance: "Seguros Médicos Nacional",
      policyNumber: "SM-987654321",
    },
    department: "Cardiología",
    doctor: "Dr. Carlos Méndez",
    createdAt: "2023-05-10",
    updatedAt: "2023-05-12",
    status: "Completado",
    statusColor: "green",
    priority: "Media",
    priorityColor: "yellow",
    waitingTime: "2 días",
    history:
      "Paciente con antecedentes de hipertensión arterial y diabetes mellitus tipo 2. Acude por dolor torácico ocasional de 1 semana de evolución.",
    symptoms: "Dolor torácico no irradiado, de intensidad moderada, que aparece en reposo, de duración variable.",
    diagnosis: "Hipertrofia ventricular izquierda leve secundaria a hipertensión arterial sistémica.",
    treatment: "Se ajusta medicación antihipertensiva y se recomienda seguimiento en 1 mes.",
    notes:
      "Ultrasonido cardíaco muestra hipertrofia ventricular izquierda leve, sin alteraciones valvulares significativas.",
    ultrasounds: [
      {
        id: "US-002-1",
        date: "2023-05-10",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ecocardiograma, vista de cuatro cámaras",
        findings: "Hipertrofia ventricular izquierda leve",
      },
      {
        id: "US-002-2",
        date: "2023-05-10",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ecocardiograma, vista paraesternal eje largo",
        findings: "Función ventricular conservada, FEVI 60%",
      },
    ],
    sharedWith: [],
    aiAnalysis: {
      result: "Hipertrofia ventricular izquierda leve",
      confidence: "92%",
      recommendations: "Seguimiento regular, control de factores de riesgo cardiovascular",
      comparisons: "Análisis basado en 1,245 casos similares",
      date: "2023-05-11",
    },
    timeline: [
      { date: "2023-05-10 11:20", event: "Caso creado", user: "Dr. Carlos Méndez" },
      { date: "2023-05-10 11:35", event: "Imágenes de ultrasonido subidas", user: "Dr. Carlos Méndez" },
      { date: "2023-05-11 09:15", event: "Análisis de IA completado", user: "Sistema SONAID" },
      { date: "2023-05-12 14:30", event: "Diagnóstico confirmado y caso completado", user: "Dr. Carlos Méndez" },
    ],
  },
  "PC-003": {
    id: "PC-003",
    patient: {
      initials: "LP",
      name: "Laura Pérez",
      age: 35,
      gender: "Femenino",
      email: "laura.perez@email.com",
      phone: "+52 55 2468 1357",
      address: "Paseo de la Reforma 555, Ciudad de México",
      insurance: "Seguros Médicos Premium",
      policyNumber: "SMP-246810",
    },
    department: "Obstetricia",
    doctor: "Dr. Ana Martínez",
    createdAt: "2023-05-08",
    updatedAt: "2023-05-10",
    status: "En Revisión",
    statusColor: "blue",
    priority: "Media",
    priorityColor: "yellow",
    waitingTime: "2 días",
    history: "Paciente G2 P1, cursando embarazo de 28 semanas. Acude para control prenatal de rutina.",
    symptoms: "Sin síntomas de alarma. Refiere movimientos fetales adecuados.",
    diagnosis: "Embarazo de 28 semanas en evolución normal",
    treatment: "Control prenatal mensual, suplementación con hierro y ácido fólico",
    notes:
      "Ultrasonido obstétrico muestra feto único vivo, con crecimiento acorde a edad gestacional. Placenta anterior, grado I, líquido amniótico normal.",
    ultrasounds: [
      {
        id: "US-003-1",
        date: "2023-05-08",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido obstétrico, biometría fetal",
        findings: "Biometría acorde a 28 semanas",
      },
      {
        id: "US-003-2",
        date: "2023-05-08",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido obstétrico, visualización cardíaca",
        findings: "Frecuencia cardíaca fetal 145 lpm",
      },
      {
        id: "US-003-3",
        date: "2023-05-08",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido obstétrico, perfil biofísico",
        findings: "Perfil biofísico 8/8",
      },
      {
        id: "US-003-4",
        date: "2023-05-08",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido obstétrico, doppler de arteria umbilical",
        findings: "Índice de pulsatilidad normal",
      },
    ],
    sharedWith: [
      { name: "Dr. Carlos Méndez", specialty: "Oncología Mamaria", email: "carlos.mendez@hospital.med" },
      { name: "Dr. Ana Martínez", specialty: "Obstetricia", email: "ana.martinez@hospital.med" },
      { name: "Dr. Luis Ramírez", specialty: "Radiología", email: "luis.ramirez@hospital.med" },
    ],
    aiAnalysis: {
      result: "Embarazo normal en evolución",
      confidence: "96%",
      recommendations: "Continuar control prenatal regular",
      comparisons: "Análisis basado en 2,350 casos similares",
      date: "2023-05-09",
    },
    timeline: [
      { date: "2023-05-08 10:15", event: "Caso creado", user: "Dr. Ana Martínez" },
      { date: "2023-05-08 10:30", event: "Imágenes de ultrasonido subidas", user: "Dr. Ana Martínez" },
      { date: "2023-05-08 14:45", event: "Caso compartido con especialistas", user: "Dr. Ana Martínez" },
      { date: "2023-05-09 11:20", event: "Análisis de IA completado", user: "Sistema SONAID" },
      { date: "2023-05-09 15:30", event: "Visualizado por Dr. Luis Ramírez", user: "Dr. Luis Ramírez" },
      { date: "2023-05-10 09:15", event: "Visualizado por Dr. Carlos Méndez", user: "Dr. Carlos Méndez" },
      { date: "2023-05-10 16:00", event: "Comentario añadido por Dr. Luis Ramírez", user: "Dr. Luis Ramírez" },
    ],
  },
  "PC-004": {
    id: "PC-004",
    patient: {
      initials: "AS",
      name: "Ana Sánchez",
      age: 48,
      gender: "Femenino",
      email: "ana.sanchez@email.com",
      phone: "+52 55 9876 5432",
      address: "Av. Universidad 1000, Ciudad de México",
      insurance: "Seguros Médicos Nacional",
      policyNumber: "SM-654321",
    },
    department: "Oncología Mamaria",
    doctor: "Dr. Carlos Méndez",
    createdAt: "2023-05-05",
    updatedAt: "2023-05-07",
    status: "Alerta",
    statusColor: "red",
    priority: "Alta",
    priorityColor: "red",
    waitingTime: "2 días",
    history:
      "Paciente con antecedente de carcinoma ductal in situ en mama derecha hace 5 años, tratado con cirugía conservadora y radioterapia. Acude para control rutinario.",
    symptoms: "Sin síntomas actuales. Última mamografía de control hace 1 año sin hallazgos significativos.",
    diagnosis:
      "Pendiente confirmación. IA sugiere área sospechosa de malignidad en cuadrante inferior interno de mama izquierda.",
    treatment: "Pendiente confirmación diagnóstica. Se sugiere biopsia guiada por ultrasonido.",
    notes:
      "Ultrasonido de control detecta área hipoecoica de bordes irregulares en cuadrante inferior interno de mama izquierda, no presente en estudios previos. IA sugiere alta probabilidad de malignidad.",
    ultrasounds: [
      {
        id: "US-004-1",
        date: "2023-05-05",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido de mama izquierda, cuadrante inferior interno",
        findings: "Área hipoecoica de bordes irregulares de 0.8 x 1.2 cm",
      },
      {
        id: "US-004-2",
        date: "2023-05-05",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido de mama izquierda, doppler",
        findings: "Ligero aumento de la vascularización perilesional",
      },
    ],
    sharedWith: [{ name: "Dr. Luis Ramírez", specialty: "Radiología", email: "luis.ramirez@hospital.med" }],
    aiAnalysis: {
      result: "Alta probabilidad de malignidad (BI-RADS 4C)",
      confidence: "89%",
      recommendations: "Se recomienda biopsia guiada por ultrasonido",
      comparisons: "Análisis basado en 1,875 casos similares",
      date: "2023-05-06",
    },
    timeline: [
      { date: "2023-05-05 15:45", event: "Caso creado", user: "Dr. Carlos Méndez" },
      { date: "2023-05-05 16:00", event: "Imágenes de ultrasonido subidas", user: "Dr. Carlos Méndez" },
      { date: "2023-05-05 16:10", event: "Caso compartido con Dr. Luis Ramírez", user: "Dr. Carlos Méndez" },
      { date: "2023-05-06 09:30", event: "Análisis de IA completado", user: "Sistema SONAID" },
      { date: "2023-05-06 10:15", event: "Alerta generada por hallazgos de IA", user: "Sistema SONAID" },
      { date: "2023-05-06 14:30", event: "Visualizado por Dr. Luis Ramírez", user: "Dr. Luis Ramírez" },
      {
        date: "2023-05-07 11:00",
        event: "Comentario y confirmación de hallazgos por Dr. Luis Ramírez",
        user: "Dr. Luis Ramírez",
      },
    ],
  },
  "PC-006": {
    id: "PC-006",
    patient: {
      initials: "CM",
      name: "Carmen Morales",
      age: 39,
      gender: "Femenino",
      email: "carmen.morales@email.com",
      phone: "+52 55 3456 7890",
      address: "Calle Madero 456, Monterrey, Nuevo León",
      insurance: "Seguros Médicos Premium",
      policyNumber: "SMP-789012",
    },
    department: "Oncología Mamaria",
    doctor: "Dr. Carlos Méndez",
    createdAt: "2023-05-01",
    updatedAt: "2023-05-01",
    status: "Pendiente",
    statusColor: "yellow",
    priority: "Media",
    priorityColor: "yellow",
    waitingTime: "14 días",
    history:
      "Paciente que acude para valoración por autodetección de nódulo en mama derecha de aproximadamente 1 mes de evolución.",
    symptoms: "Nódulo palpable en cuadrante superior externo de mama derecha, no doloroso, sin cambios en piel.",
    diagnosis: null,
    treatment: null,
    notes:
      "Se realiza ultrasonido que muestra nódulo de características probablemente benignas. Pendiente análisis de IA.",
    ultrasounds: [
      {
        id: "US-006-1",
        date: "2023-05-01",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido de mama derecha, nódulo en CSE",
        findings: "Nódulo hipoecoico de bordes bien definidos de 1.3 x 0.9 cm",
      },
      {
        id: "US-006-2",
        date: "2023-05-01",
        imageUrl: "/placeholder.svg?height=400&width=600",
        description: "Ultrasonido de mama derecha, doppler",
        findings: "Sin aumento significativo de la vascularización",
      },
    ],
    sharedWith: [],
    aiAnalysis: null,
    timeline: [
      { date: "2023-05-01 12:30", event: "Caso creado", user: "Dr. Carlos Méndez" },
      { date: "2023-05-01 12:45", event: "Imágenes de ultrasonido subidas", user: "Dr. Carlos Méndez" },
    ],
  },
}

export default function CaseDetailsPage({ params }: { params: { caseId: string } }) {
  const caseId = params.caseId
  const caseData = casesDatabase[caseId]

  const aiAnalysisRef = useRef<HTMLDivElement>(null)

  // In case the ID doesn't exist in our database
  if (!caseData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white p-8">
          <Link href="/" className="flex items-center text-red-600 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Dashboard
          </Link>
          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold">Caso no encontrado</h1>
            <p className="mt-2 text-gray-500">El caso con ID {caseId} no existe o ha sido eliminado.</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <header className="border-b border-gray-100 bg-white">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <span className="text-xl font-bold text-red-600">Diagnosia</span>
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
          {/* Header with basic case info */}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Caso {caseData.id}</h1>
                <Badge
                  className={`bg-${caseData.statusColor}-100 text-${caseData.statusColor}-700 hover:bg-${caseData.statusColor}-100`}
                >
                  {caseData.status}
                </Badge>
                {caseData.priority && (
                  <Badge
                    className={`bg-${caseData.priorityColor}-100 text-${caseData.priorityColor}-700 hover:bg-${caseData.priorityColor}-100`}
                  >
                    Prioridad {caseData.priority}
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  <span>Doctor: {caseData.doctor}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Creado: {caseData.createdAt}</span>
                </div>
                {caseData.waitingTime && (
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>Tiempo de espera: {caseData.waitingTime}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {caseData.ultrasounds && caseData.ultrasounds.length > 0 && <PdfDownloadButton caseData={caseData} />}
            </div>
          </div>

          {/* Cards with patient info and case details - Always visible */}
          <div className="grid gap-6">
            {/* Patient Information - Full width card */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-medium text-red-600">
                    {caseData.patient.initials}
                  </div>
                  Información del Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p>{caseData.patient.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Género / Edad</p>
                  <p>
                    {caseData.patient.gender} / {caseData.patient.age} años
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                  <p>{caseData.patient.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Teléfono</p>
                  <p>{caseData.patient.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Dirección</p>
                  <p>{caseData.patient.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Seguro Médico</p>
                  <p>{caseData.patient.insurance}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Número de Póliza</p>
                  <p>{caseData.patient.policyNumber}</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Case Details - Takes 2/3 of the width */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Detalles del Caso</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Departamento</p>
                    <p>{caseData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Historia Clínica</p>
                    <p className="text-sm">{caseData.history}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Síntomas</p>
                    <p className="text-sm">{caseData.symptoms}</p>
                  </div>
                  {caseData.diagnosis && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Diagnóstico</p>
                      <p className="text-sm">{caseData.diagnosis}</p>
                    </div>
                  )}
                  {caseData.treatment && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tratamiento</p>
                      <p className="text-sm">{caseData.treatment}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notas</p>
                    <p className="text-sm">{caseData.notes}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Shared With - Takes 1/3 of the width */}
              {caseData.sharedWith && caseData.sharedWith.length > 0 && (
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      <Share2 className="mr-2 h-5 w-5 text-gray-500" />
                      Compartido con
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {caseData.sharedWith.map((doctor, index) => (
                        <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                            {doctor.name.split(" ")[0][0]}
                            {doctor.name.split(" ")[1][0]}
                          </div>
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-xs text-gray-500">{doctor.specialty}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Tabs for additional content - Positioned below case details */}
          <div className="mt-8">
            <Tabs defaultValue="images">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="images">Imágenes ({caseData.ultrasounds?.length || 0})</TabsTrigger>
                <TabsTrigger value="ai">Análisis IA</TabsTrigger>
                <TabsTrigger value="timeline">Línea de Tiempo</TabsTrigger>
              </TabsList>

              {/* Tab: Images */}
              <TabsContent value="images" className="mt-6">
                {caseData.ultrasounds && caseData.ultrasounds.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {caseData.ultrasounds.map((ultrasound) => (
                      <Card key={ultrasound.id} className="overflow-hidden">
                        <div className="relative aspect-video w-full bg-gray-100">
                          <img
                            src={ultrasound.imageUrl || "/placeholder.svg"}
                            alt={ultrasound.description}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{ultrasound.description}</h3>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1 h-4 w-4" />
                            {ultrasound.date}
                          </div>
                          <p className="mt-2 text-sm">{ultrasound.findings}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <p>No hay imágenes disponibles para este caso.</p>
                  </Card>
                )}
              </TabsContent>

              {/* Tab: AI Analysis */}
              <TabsContent value="ai" className="mt-6">
                <Card ref={aiAnalysisRef}>
                  <CardHeader>
                    <CardTitle>Análisis de Inteligencia Artificial</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-2 text-lg font-bold">Resultado:</h3>
                      <p className={`text-xl font-bold ${caseData.id === "PC-004" ? "text-red-600" : "text-gray-900"}`}>
                        {caseData.id === "PC-001"
                          ? "Posible lesión BIRADS 4A - Baja sospecha de malignidad"
                          : caseData.id === "PC-004"
                            ? "Alta probabilidad de malignidad (BI-RADS 4C)"
                            : caseData.id === "PC-006"
                              ? "Lesión probablemente benigna (BI-RADS 3)"
                              : "Hallazgos normales (BI-RADS 1)"}
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="mr-1 text-sm font-medium">Confianza:</span>
                        <span className="text-sm">
                          {caseData.id === "PC-001"
                            ? "87%"
                            : caseData.id === "PC-004"
                              ? "92%"
                              : caseData.id === "PC-006"
                                ? "95%"
                                : "98%"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Hallazgos</h3>
                      <p className="text-sm">
                        {caseData.id === "PC-001"
                          ? "Se identifica nódulo hipoecoico de bordes parcialmente definidos en cuadrante superior externo de mama izquierda, midiendo aproximadamente 1.5 cm en su diámetro mayor. No presenta sombra acústica posterior. Vascularización periférica moderada en el estudio Doppler."
                          : caseData.id === "PC-004"
                            ? "Área hipoecoica de bordes irregulares en cuadrante inferior interno de mama izquierda, con medidas de 0.8 x 1.2 cm. Presenta ligera sombra acústica posterior y aumento de la vascularización perilesional. Características altamente sospechosas de malignidad."
                            : caseData.id === "PC-006"
                              ? "Nódulo hipoecoico de bordes bien definidos en cuadrante superior externo de mama derecha, midiendo 1.3 x 0.9 cm. Sin aumento significativo de la vascularización. Características sugestivas de fibroadenoma."
                              : "No se identifican lesiones focales. Patrón ecográfico normal para la edad del paciente."}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Recomendaciones</h3>
                      <p className="text-sm">
                        {caseData.id === "PC-001"
                          ? "Se recomienda biopsia con aguja gruesa guiada por ultrasonido para caracterización histológica de la lesión. Correlacionar con mamografía si está disponible."
                          : caseData.id === "PC-004"
                            ? "Se recomienda biopsia guiada por ultrasonido con urgencia. Considerar evaluación por oncología mamaria tras resultado histopatológico."
                            : caseData.id === "PC-006"
                              ? "Se recomienda seguimiento ecográfico en 6 meses para confirmar estabilidad. No se requiere biopsia en este momento salvo cambios clínicos."
                              : "Control rutinario según protocolo para el paciente."}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Metodología</h3>
                      <p className="text-sm">
                        Análisis basado en{" "}
                        {caseData.id === "PC-001"
                          ? "1,845"
                          : caseData.id === "PC-004"
                            ? "2,156"
                            : caseData.id === "PC-006"
                              ? "3,210"
                              : "1,750"}{" "}
                        casos similares. El algoritmo utiliza una red neuronal convolucional entrenada con más de 50,000
                        imágenes de ultrasonido mamario con confirmación histopatológica.
                      </p>
                    </div>

                    {/* Removed date and details button section */}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab: Timeline */}
              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Línea de Tiempo del Caso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative space-y-0">
                      {caseData.timeline.map((event, index) => (
                        <div key={index} className="relative pb-8">
                          {index !== caseData.timeline.length - 1 && (
                            <span
                              className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            ></span>
                          )}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <Clock className="h-5 w-5 text-gray-500" />
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{event.event}</p>
                                <p className="text-xs text-gray-500">Por: {event.user}</p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                <time>{event.date}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
