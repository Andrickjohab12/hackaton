"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Simple PDF generation function (mock implementation)
// In a real application, you would use a library like jsPDF or react-pdf
function generatePDF(caseData: any): string {
  // This is a mock function that would normally generate a PDF
  // For this example, we just create a URL that simulates a PDF download

  // In a real app, you would create a proper PDF with the case data
  // and return a blob URL or trigger a download

  // For demonstration purposes, we'll just return a mock URL
  return "#pdf-generated"
}

export function PdfDownloadButton({ caseData }: { caseData: any }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = () => {
    setIsGenerating(true)

    // Simulate PDF generation delay
    setTimeout(() => {
      const pdfUrl = generatePDF(caseData)

      // In a real app, this would create an actual download
      // For now, we'll just alert the user
      alert(
        `Se descargará un PDF con la información del caso ${caseData.id} del paciente ${caseData.patient.name} y sus imágenes.`,
      )

      setIsGenerating(false)
    }, 1500)
  }

  return (
    <Button variant="outline" onClick={handleDownload} disabled={isGenerating} className="flex items-center gap-2">
      {isGenerating ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
          Generando...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Descargar PDF
        </>
      )}
    </Button>
  )
}
