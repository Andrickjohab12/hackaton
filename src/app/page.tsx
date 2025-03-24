import Link from "next/link"
import { ArrowRight, BarChart3, Menu, Shield, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-xl font-bold">FinMateAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/ai-advisor">
          Asesor de IA
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/history">
            Historia
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            Acerca de Nosotros
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
            Contacto
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link className="flex items-center" href="/">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                    <span className="ml-2 text-xl font-bold">FinMateAI</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/">
                    Home
                  </Link>
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/ai-advisor">
                    AI Advisor
                  </Link>
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/history">
                    History
                  </Link>
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/about">
                    About Us
                  </Link>
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/contact">
                    Contact
                  </Link>
                </nav>
                <div className="mt-auto pt-4 border-t">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Empezar</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Asesoramiento Financiero Personalizado Desarrollado por IA
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Asesoramiento Financiero Personalizado Desarrollado por IA
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/ai-advisor">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Prueba el Asesor IA <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100/10">
                    Contáctenos
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  alt="Financial Dashboard"
                  className="rounded-lg object-cover"
                  height="400"
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Cómo Nuestra IA Te Ayuda</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nuestra IA avanzada analiza sus datos financieros para proporcionar recomendaciones e ideas personalizadas.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Análisis de Gastos</h3>
                <p className="text-center text-gray-500">
                Obtenga información sobre sus hábitos de gasto e identifique áreas de mejora.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Shield className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Plataforma Segura</h3>
                <p className="text-center text-gray-500">
                Sus datos financieros están protegidos con medidas de seguridad de nivel empresarial.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Sparkles className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Asesoramiento Personalizado</h3>
                <p className="text-center text-gray-500">
                Reciba recomendaciones personalizadas basadas en su situación financiera única.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6 bg-black text-white">
        <p className="text-xs text-gray-400">© 2024 FinMateAI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
          Términos de Servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
          Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  )
}

