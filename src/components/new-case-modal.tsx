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
import { Upload, X } from "lucide-react"

export function NewCaseModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

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
      }
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setUploadedImage(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Crear Nuevo Caso</DialogTitle>
          <DialogDescription>
            Complete la información del paciente y suba las imágenes de ultrasonido para análisis.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="patient-info" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patient-info">Información del Paciente</TabsTrigger>
            <TabsTrigger value="medical-info">Información Médica</TabsTrigger>
            <TabsTrigger value="images">Imágenes y Notas</TabsTrigger>
          </TabsList>

          {/* Sección A: Información del Paciente */}
          <TabsContent value="patient-info" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" placeholder="Nombre del paciente" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" placeholder="Apellido del paciente" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input id="birthDate" type="date" placeholder="dd/mm/aaaa" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientId">ID de Paciente (opcional)</Label>
                <Input id="patientId" placeholder="ID del paciente" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Género</Label>
              <RadioGroup defaultValue="female" className="flex space-x-4">
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
              <Label htmlFor="department">Departamento</Label>
              <Select>
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
            <div className="space-y-2">
              <Label htmlFor="consultReason">Motivo de Consulta</Label>
              <Textarea id="consultReason" placeholder="Describa el motivo de la consulta" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthHistory">Historial de Salud Mamaria</Label>
              <Textarea id="healthHistory" placeholder="Condiciones previas, antecedentes familiares..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mamografía Previa</Label>
                <RadioGroup defaultValue="no" className="flex space-x-4">
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
                <RadioGroup defaultValue="no" className="flex space-x-4">
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
              <Textarea id="medications" placeholder="Liste los medicamentos actuales del paciente" />
            </div>
          </TabsContent>

          {/* Sección C: Imágenes y Notas */}
          <TabsContent value="images" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Imagen de Ultrasonido / Mamografía</Label>
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
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6 flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">Crear Caso de Paciente</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
