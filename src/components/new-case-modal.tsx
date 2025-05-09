"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, X, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function NewCaseModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [activeTab, setActiveTab] = useState("patient-info")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Form data state
  const [patientForm, setPatientForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    patientId: "",
    gender: "female",
    department: "",
  })

  const [medicalForm, setMedicalForm] = useState({
    consultReason: "",
    healthHistory: "",
    previousMammo: "no",
    previousBiopsy: "no",
    medications: "",
  })

  const [notesForm, setNotesForm] = useState({
    additionalNotes: "",
  })

  // Validation state
  const [errors, setErrors] = useState({
    patientInfo: false,
    medicalInfo: false,
    imagesNotes: false,
  })

  // Check if sections are complete
  const isPatientInfoComplete = () => {
    return (
      patientForm.firstName.trim() !== "" &&
      patientForm.lastName.trim() !== "" &&
      patientForm.birthDate.trim() !== "" &&
      patientForm.department !== ""
    )
  }

  const isMedicalInfoComplete = () => {
    return medicalForm.consultReason.trim() !== ""
  }

  const isImagesNotesComplete = () => {
    return uploadedImage !== null
  }

  const isFormComplete = () => {
    return isPatientInfoComplete() && isMedicalInfoComplete() && isImagesNotesComplete()
  }

  const validateCurrentTab = () => {
    if (activeTab === "patient-info") {
      const isValid = isPatientInfoComplete()
      setErrors({ ...errors, patientInfo: !isValid })
      return isValid
    } else if (activeTab === "medical-info") {
      const isValid = isMedicalInfoComplete()
      setErrors({ ...errors, medicalInfo: !isValid })
      return isValid
    } else if (activeTab === "images") {
      const isValid = isImagesNotesComplete()
      setErrors({ ...errors, imagesNotes: !isValid })
      return isValid
    }
    return false
  }

  const handleNextTab = () => {
    if (validateCurrentTab()) {
      if (activeTab === "patient-info") {
        setActiveTab("medical-info")
      } else if (activeTab === "medical-info") {
        setActiveTab("images")
      }
    }
  }

  const handlePrevTab = () => {
    if (activeTab === "medical-info") {
      setActiveTab("patient-info")
    } else if (activeTab === "images") {
      setActiveTab("medical-info")
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string)
        setErrors({ ...errors, imagesNotes: false })
      }
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setUploadedImage(null)
  }

  const handleSubmit = () => {
    if (isFormComplete()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitSuccess(true)

        // Reset form after 3 seconds and close modal
        setTimeout(() => {
          setSubmitSuccess(false)
          resetForm()
          setOpen(false)
        }, 3000)
      }, 1500)
    } else {
      // Validate all sections
      setErrors({
        patientInfo: !isPatientInfoComplete(),
        medicalInfo: !isMedicalInfoComplete(),
        imagesNotes: !isImagesNotesComplete(),
      })

      // Navigate to the first incomplete tab
      if (!isPatientInfoComplete()) {
        setActiveTab("patient-info")
      } else if (!isMedicalInfoComplete()) {
        setActiveTab("medical-info")
      } else {
        setActiveTab("images")
      }
    }
  }

  const resetForm = () => {
    setPatientForm({
      firstName: "",
      lastName: "",
      birthDate: "",
      patientId: "",
      gender: "female",
      department: "",
    })

    setMedicalForm({
      consultReason: "",
      healthHistory: "",
      previousMammo: "no",
      previousBiopsy: "no",
      medications: "",
    })

    setNotesForm({
      additionalNotes: "",
    })

    setUploadedImage(null)
    setActiveTab("patient-info")
    setErrors({
      patientInfo: false,
      medicalInfo: false,
      imagesNotes: false,
    })
  }

  const handlePatientFormChange = (field: string, value: string) => {
    setPatientForm({ ...patientForm, [field]: value })
  }

  const handleMedicalFormChange = (field: string, value: string) => {
    setMedicalForm({ ...medicalForm, [field]: value })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          // Ask for confirmation if form has data and is not submitted successfully
          if (
            !submitSuccess &&
            (patientForm.firstName || patientForm.lastName || medicalForm.consultReason || uploadedImage)
          ) {
            if (window.confirm("¿Está seguro que desea cerrar? Se perderán los datos no guardados.")) {
              resetForm()
              setOpen(false)
            }
          } else {
            resetForm()
            setOpen(false)
          }
        } else {
          setOpen(true)
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Crear Nuevo Caso</DialogTitle>
          <DialogDescription>
            Complete la información del paciente y suba las imágenes de ultrasonido para análisis.
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="py-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">¡Caso creado con éxito!</h3>
              <p className="mt-2 text-gray-500">El caso ha sido registrado correctamente y está listo para análisis.</p>
            </div>
          </div>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patient-info">Información del Paciente</TabsTrigger>
                <TabsTrigger value="medical-info">Información Médica</TabsTrigger>
                <TabsTrigger value="images">Imágenes y Notas</TabsTrigger>
              </TabsList>

              {/* Sección A: Información del Paciente */}
              <TabsContent value="patient-info" className="space-y-4 py-4">
                {errors.patientInfo && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Por favor complete todos los campos obligatorios marcados con *.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      placeholder="Nombre del paciente"
                      value={patientForm.firstName}
                      onChange={(e) => handlePatientFormChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      placeholder="Apellido del paciente"
                      value={patientForm.lastName}
                      onChange={(e) => handlePatientFormChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      placeholder="dd/mm/aaaa"
                      value={patientForm.birthDate}
                      onChange={(e) => handlePatientFormChange("birthDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientId">ID de Paciente (opcional)</Label>
                    <Input
                      id="patientId"
                      placeholder="ID del paciente"
                      value={patientForm.patientId}
                      onChange={(e) => handlePatientFormChange("patientId", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Género</Label>
                  <RadioGroup
                    value={patientForm.gender}
                    onValueChange={(value) => handlePatientFormChange("gender", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Femenino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Otro</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Departamento *</Label>
                  <Select
                    value={patientForm.department}
                    onValueChange={(value) => handlePatientFormChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiología</SelectItem>
                      <SelectItem value="obstetrics">Obstetricia</SelectItem>
                      <SelectItem value="breast-oncology">Oncología Mamaria</SelectItem>
                      <SelectItem value="general">Medicina General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              {/* Sección B: Información Médica */}
              <TabsContent value="medical-info" className="space-y-4 py-4">
                {errors.medicalInfo && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Por favor complete el motivo de consulta, es un campo obligatorio.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="consultReason">Motivo de Consulta *</Label>
                  <Textarea
                    id="consultReason"
                    placeholder="Describa el motivo de la consulta"
                    value={medicalForm.consultReason}
                    onChange={(e) => handleMedicalFormChange("consultReason", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="healthHistory">Historial de Salud Mamaria</Label>
                  <Textarea
                    id="healthHistory"
                    placeholder="Condiciones previas, antecedentes familiares..."
                    value={medicalForm.healthHistory}
                    onChange={(e) => handleMedicalFormChange("healthHistory", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Mamografía Previa</Label>
                    <RadioGroup
                      value={medicalForm.previousMammo}
                      onValueChange={(value) => handleMedicalFormChange("previousMammo", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="mammo-yes" />
                        <Label htmlFor="mammo-yes">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="mammo-no" />
                        <Label htmlFor="mammo-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Biopsias Mamarias Previas</Label>
                    <RadioGroup
                      value={medicalForm.previousBiopsy}
                      onValueChange={(value) => handleMedicalFormChange("previousBiopsy", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="biopsy-yes" />
                        <Label htmlFor="biopsy-yes">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="biopsy-no" />
                        <Label htmlFor="biopsy-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Medicamentos Actuales</Label>
                  <Textarea
                    id="medications"
                    placeholder="Liste los medicamentos actuales del paciente"
                    value={medicalForm.medications}
                    onChange={(e) => handleMedicalFormChange("medications", e.target.value)}
                  />
                </div>
              </TabsContent>

              {/* Sección C: Imágenes y Notas */}
              <TabsContent value="images" className="space-y-4 py-4">
                {errors.imagesNotes && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Por favor suba al menos una imagen para continuar.</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label>Imagen de Ultrasonido / Mamografía *</Label>
                  <div
                    className={`relative flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                      dragActive ? "border-red-400 bg-red-50" : "border-gray-300 hover:bg-gray-50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {uploadedImage ? (
                      <div className="relative">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded ultrasound"
                          className="max-h-[300px] rounded-lg object-contain"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute -right-3 -top-3 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mb-4 h-10 w-10 text-gray-400" />
                        <p className="mb-2 text-center text-sm font-medium text-gray-700">
                          Arrastre y suelte su imagen de ultrasonido aquí
                        </p>
                        <p className="mb-4 text-center text-xs text-gray-500">Soporta JPEG, PNG, DICOM (máx. 10MB)</p>
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                        >
                          Explorar Archivos
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept="image/*,.dcm"
                          onChange={handleChange}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Notas Adicionales</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Ingrese cualquier nota adicional u observaciones..."
                    rows={4}
                    value={notesForm.additionalNotes}
                    onChange={(e) => setNotesForm({ ...notesForm, additionalNotes: e.target.value })}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6 flex justify-between sm:justify-between">
              {activeTab === "patient-info" ? (
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              ) : (
                <Button variant="outline" onClick={handlePrevTab}>
                  Anterior
                </Button>
              )}

              {activeTab === "images" ? (
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormComplete()}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Enviando...
                    </>
                  ) : (
                    "Crear Caso de Paciente"
                  )}
                </Button>
              ) : (
                <Button onClick={handleNextTab}>Siguiente</Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
