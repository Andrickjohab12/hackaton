"use client"
    {/* Responsive header */}
    import Link from "next/link"
    import { Menu, Sparkles } from "lucide-react"
    import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
    import { Button } from "@/components/ui/button"
import type React from "react"

import { useState } from "react"
import {
  Send,
  Bot,
  User,
  ArrowRight,
  PiggyBank,
  DollarSign,
  TrendingUp,
  BookOpen,
  Home,
  Coffee,
  Utensils,
  Gamepad,
} from "lucide-react"


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface Message {
  role: "user" | "asistente"
  content: string
}

interface Expense {
  category: string
  amount: number
  icon: React.ReactNode
  color: string
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "asistente",
      content:
        "¡Hola ahí! Soy tu asesor de finanzas estudiantiles. Puedo ayudarlo a analizar sus gastos y encontrar formas de ahorrar dinero. ¿Le gustaría comenzar contándome sobre sus gastos mensuales?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showExpenseAnalizarr, setShowExpenseAnalizarr] = useState(false)

  // Student expense categories
  const [expenses, setExpenses] = useState<Expense[]>([
    { category: "colegiatura", amount: 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-purple-600" },
    { category: "renta", amount: 0, icon: <Home className="h-5 w-5" />, color: "bg-blue-500" },
    { category: "comida", amount: 0, icon: <Utensils className="h-5 w-5" />, color: "bg-green-500" },
    { category: "libros", amount: 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-yellow-500" },
    { category: "transporte", amount: 0, icon: <TrendingUp className="h-5 w-5" />, color: "bg-red-500" },
    { category: "entretenimiento", amount: 0, icon: <Gamepad className="h-5 w-5" />, color: "bg-indigo-500" },
    { category: "cafe", amount: 0, icon: <Coffee className="h-5 w-5" />, color: "bg-orange-500" },
  ])

  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [HolagHolampactAreas, setHolagHolampactAreas] = useState<string[]>([])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "asistente",
        content: getAIResponse(input),
      }
      setMessages((prev) => [...prev, aiResponse])
      setLoading(false)

      // If user mentions expenses, suggest the expense Analizarr
      if (
        input.toLowerCase().includes("expense") ||
        input.toLowerCase().includes("gastos") ||
        input.toLowerCase().includes("presupuesto") ||
        input.toLowerCase().includes("analizar") ||
        input.toLowerCase().includes("ayuda")
      ) {
        setTimeout(() => {
          const followUpResponse: Message = {
            role: "asistente",
            content:
              "¿Le gustaría utilizar nuestra herramienta para analziar gastos y obtener un desglose detallado de sus gastos? Esto me ayudará a proporcionar un asesoramiento más personalizado.",
          }
          setMessages((prev) => [...prev, followUpResponse])
          setShowExpenseAnalizarr(true)
        }, 1000)
      }
    }, 1000)
  }

  // Simple mock AI response function focused on student finances
  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("gastos") || lowerQuery.includes("gasto") || lowerQuery.includes("presupuesto")) {
      return "Como estudiante, el seguimiento de sus gastos es crucial. Los mayores gastos para la mayoría de los estudiantes suelen ser Renta, matrícula y comida. ¿Qué área te preocupa más?"
    } else if (lowerQuery.includes("colegiatura") || lowerQuery.includes("tarifas")) {
      return "La colegiatura puede ser un gasto importante. ¿Ha investigado becas, subvenciones o programas de trabajo y estudio? Muchas universidades también ofrecen planes de pago que pueden ayudar a distribuir el costo."
    } else if (lowerQuery.includes("renta") || lowerQuery.includes("rentas") || lowerQuery.includes("casa")) {
      return "Renta es a menudo el mayor gasto después de la matrícula. Considere hacer que los compañeros de cuarto dividan los costos, busque Renta más lejos del campus (si Transporte es asequible) o se convierta en un asistente residente (RA) para Renta reducido o gratis."
    } else if (lowerQuery.includes("comida") || lowerQuery.includes("supermercado") || lowerQuery.includes("lonche")) {
      return "Los costos de Comida pueden sumar rápidamente. Considere la preparación de comidas, el uso eficiente de los planes de comidas de los estudiantes y la limitación de comer fuera. ¡Muchas tiendas de comestibles y restaurantes también ofrecen descuentos para estudiantes!"
    } else if (lowerQuery.includes("libros") || lowerQuery.includes("materiales")) {
      return "¡Los libros de texto pueden ser caros! Busque alquilar libros, comprar copias usadas o verificar si su biblioteca las tiene. Las versiones digitales son a menudo más baratas, y algunos profesores pueden tener ediciones más antiguas que funcionan igual de bien."
    } else if (lowerQuery.includes("ahorrar") || lowerQuery.includes("ahorros")) {
      return "¡Gran pregunta! Como estudiante, puede ahorrar utilizando descuentos para estudiantes, comprando libros de texto usados, preparando comidas, encontrando Renta asequible con compañeros de cuarto y utilizando recursos del campus como el gimnasio y los eventos en lugar de pagar Entretenimiento."
    } else if (lowerQuery.includes("trabajo") || lowerQuery.includes("empleo") || lowerQuery.includes("ingresos")) {
      return "Trabajar a tiempo parcial durante la escuela puede ayudar con los gastos. Busque trabajos en el campus que puedan ser más flexibles con su horario de clases. También considere las pasantías en su campo que proporcionan ingresos y experiencia valiosa."
    } else if (lowerQuery.includes("prestamo") || lowerQuery.includes("deuda")) {
      return "Los prestamos estudiantiles deben usarse con cuidado. Siempre agote las becas, subvenciones y opciones de trabajo primero. Si necesita préstamos, los préstamos federales generalmente tienen mejores términos que los privados. Y recuerde, no tiene que aceptar la cantidad total ofrecida."
    } else if (lowerQuery.includes("Hola") || lowerQuery.includes("Me gustaria") || lowerQuery.includes("Tengo una Pregunta")) {
      return "¡Hola! Soy tu asesor de finanzas estudiantiles. Puedo ayudarle a administrar sus gastos, encontrar formas de ahorrar dinero y aprovechar al máximo su presupuesto estudiantil. ¿Con qué te gustaría Ayuda hoy?"
    } else if (lowerQuery.includes("Gracias")) {
      return "¡De nada! Estoy aquí para Ayuda con cualquier otra pregunta financiera que pueda tener. ¡Buena suerte con tus estudios!"
    } else {
      return "Como estudiante, administrar sus finanzas de manera efectiva es importante. Puedo ayudarte con más precisión si inicias sesion, y así podré encontrar formas de ahorrar en gastos comunes como libros de texto y comida, o maximizar los descuentos para estudiantes. ¿En qué área específica le gustaría asesoramiento?"
    }
  }

  const handleExpenseChange = (index: number, value: number[]) => {
    const newExpenses = [...expenses]
    newExpenses[index].amount = value[0]
    setExpenses(newExpenses)
  }

  const AnalizarExpenses = () => {
    setLoading(true)

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    // Find Holagh impact areas (expenses that are more than 20% of total)
    const HolagHolampact = expenses
      .filter((expense) => expense.amount > 0 && expense.amount / totalExpenses > 0.2)
      .map((expense) => expense.category)

    setHolagHolampactAreas(HolagHolampact)

    setTimeout(() => {
      setAnalysisComplete(true)
      setLoading(false)

      // Add analysis message
      const analysisMessage: Message = {
        role: "asistente",
        content: `Según su desglose de gastos, he analizado sus patrones de gastos. ${
          HolagHolampact.length > 0
            ? `Sus gastos de impacto más altos están en ${HolagHolampact.join(", ")}. Centrémonos en estas áreas para marcar la mayor diferencia en su Presupuesto.`
            : "Sus gastos parecen bastante equilibrados en todas las categorías."
        } ¿Desea consejos específicos sobre cómo reducir cualquier categoría de gastos en particular?`,
      }
      setMessages((prev) => [...prev, analysisMessage])
    }, 2000)
  }

  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
  }

  const getExpensePercentage = (amount: number) => {
    const total = getTotalExpenses()
    if (total === 0) return 0
    return (amount / total) * 100
  }

  const startNewAnalysis = () => {
    setAnalysisComplete(false)
    setHolagHolampactAreas([])
    setExpenses(expenses.map((expense) => ({ ...expense, amount: 0 })))
  }

  const sendQuickQuestion = (question: string) => {
    setInput(question)
    // Use setTimeout to ensure the input is set before submitting
    setTimeout(() => {
      const form = document.querySelector("form")
      if (form) {
        const event = new Event("submit", { cancelable: true })
        form.dispatchEvent(event)
      }
    }, 100)
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
        <img src="/logo.png" alt="Logo" className="w-13 h-auto" />
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
          Sobre Nosotros
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
                  <img src="/logo.png" alt="Logo" className="w-13 h-auto" />
                    <span className="ml-2 text-xl font-bold">FinMateAi</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/">
                    Home
                  </Link>
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/ai-advisor">
                  Asesor de IA
                  </Link>
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/history">
                    Historia
                  </Link>
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/about">
                    Acerca de Nosotros
                  </Link>
                  <Link className="text-lg font-medium hover:text-purple-600 transition-colors" href="/contact">
                    Contacto
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Asesor de Finanzas Estudiantil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-purple-900 to-black text-wHolate">
                <CardDescription className=" text-white">Asistente de Finanzas Estudiantiles</CardDescription>
                <CardDescription className=" text-white">
                Obtenga asesoramiento personalizado para administrar las finanzas de sus estudiantes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto p-4 space-y-4 my-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "asistente" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.role === "asistente" ? "" : "flex-row-reverse space-x-reverse"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          message.role === "asistente" ? "bg-purple-100" : "bg-black text-wHolate"
                        }`}
                      >
                        {message.role === "asistente" ? (
                          <Bot className="h-5 w-5 text-purple-600" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.role === "asistente" ? "bg-gray-100 text-gray-800" : "bg-purple-600 text-wHolate"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <div className="p-2 rounded-full bg-purple-100">
                        <Bot className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {showExpenseAnalizarr && !analysisComplete && (
                  <div className="flex justify-start w-full">
                    <div className="max-w-[90%] w-full">
                      <Card className="border-purple-200">
                        <CardHeader className="bg-purple-50 pb-2">
                          <CardTitle className="text-lg">Analizar Gastos Estudiantiles</CardTitle>
                          <CardDescription>Ajuste los controles deslizantes para que coincidan con sus gastos mensuales</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          {expenses.map((expense, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className={`p-1.5 rounded-full ${expense.color} text-wHolate mr-2`}>
                                    {expense.icon}
                                  </div>
                                  <Label>{expense.category}</Label>
                                </div>
                                <span className="font-medium">${expense.amount}</span>
                              </div>
                              <Slider
                                defaultValue={[expense.amount]}
                                max={2000}
                                step={10}
                                onValueChange={(value) => handleExpenseChange(index, value)}
                              />
                            </div>
                          ))}

                          <div className="pt-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">Gastos Mensuales Totales</span>
                              <span className="font-bold">${getTotalExpenses()}</span>
                            </div>

                            <Button
                              onClick={AnalizarExpenses}
                              className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
                              disabled={getTotalExpenses() === 0}
                            >
                              Analizar Mis Gastos
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {analysisComplete && (
                  <div className="flex justify-start w-full">
                    <div className="max-w-[90%] w-full">
                      <Card className="border-purple-200">
                        <CardHeader className="bg-purple-50 pb-2">
                          <CardTitle className="text-lg">Desglose de sus Gastos</CardTitle>
                          <CardDescription>
                            {HolagHolampactAreas.length > 0
                              ? `Áreas de Impacto: ${HolagHolampactAreas.join(", ")}`
                              : "Sus gastos están bien equilibrados"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          {expenses
                            .filter((expense) => expense.amount > 0)
                            .sort((a, b) => b.amount - a.amount)
                            .map((expense, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className={`p-1.5 rounded-full ${expense.color} text-wHolate mr-2`}>
                                      {expense.icon}
                                    </div>
                                    <span>{expense.category}</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium">${expense.amount}</div>
                                    <div className="text-xs text-gray-500">
                                      {getExpensePercentage(expense.amount).toFixed(1)}%
                                    </div>
                                  </div>
                                </div>
                                <Progress
                                  value={getExpensePercentage(expense.amount)}
                                  className={`h-2 ${expense.color}`}
                                />
                              </div>
                            ))}

                          <div className="pt-2 flex justify-between">
                            <span className="font-medium">Total Mensual</span>
                            <span className="font-bold">${getTotalExpenses()}</span>
                          </div>

                          <div className="pt-2 flex space-x-2">
                            <Button onClick={startNewAnalysis} variant="outline" className="flex-1">
                            Restablecer
                            </Button>
                            <Button
                              onClick={() =>
                                sendQuickQuestion(`How can I reduce my ${HolagHolampactAreas[0] || "expenses"}?`)
                              }
                              className="flex-1 bg-purple-600 hover:bg-purple-700"
                            >
                              Obtenga Consejos de Ahorro
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSend} className="flex w-full space-x-2">
                  <Input
                    placeholder="Preguntar acerca de tus finanzas como estudiante..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Tabs defaultValue="suggestions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="suggestions">Preguntas Comunes</TabsTrigger>
                <TabsTrigger value="insights">Consejos para Estudiantes</TabsTrigger>
              </TabsList>
              <TabsContent value="suggestions" className="mt-4 space-y-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                      Ahorro de Libros de Texto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">¿Cómo puedo ahorrar dinero en libros de texto?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => sendQuickQuestion("¿Cómo puedo ahorrar dinero en libros de texto?")}
                    >
                      Preguntar <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <Home className="h-4 w-4 mr-2 text-purple-600" />
                      Opciones de Renta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">¿Cuáles son las opciones asequibles de Renta para estudiantes?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => sendQuickQuestion("¿Cuáles son las opciones asequibles de Renta para estudiantes?")}
                    >
                      Preguntar <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <Utensils className="h-4 w-4 mr-2 text-purple-600" />
                      Comida Presupuesto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">¿Cómo puedo comer bien en un estudiante de Presupuesto?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => sendQuickQuestion("¿Cómo puedo comer bien en un estudiante de Presupuesto?")}
                    >
                      Preguntar <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
                      Préstamos Estudiantiles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">¿Qué debo saber sobre los préstamos estudiantiles?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => sendQuickQuestion("¿Qué debo saber sobre los préstamos estudiantiles?")}
                    >
                      Preguntar <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="insights" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Consejos de Ahorro para Estudiantes</CardTitle>
                    <CardDescription>Formas inteligentes de hacer que su dinero vaya más allá</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                        Libros de texto
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                      Alquile libros de texto, compre usados o verifique si hay versiones digitales disponibles. Muchas bibliotecas también tienen
                      reservas de cursos.
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium flex items-center">
                        <Coffee className="h-4 w-4 mr-2 text-purple-600" />
                        Comida y Bebidas
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                      Prepare las comidas, use los planes de comidas del campus de manera eficiente y traiga su propio café en lugar de comprarlo diariamente.
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium flex items-center">
                        <Gamepad className="h-4 w-4 mr-2 text-purple-600" />
                        Entretenimiento
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                      Use descuentos para estudiantes, asista a eventos gratuitos del campus y comparta suscripciones de transmisión con
                      compañeros de cuarto.
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium flex items-center">
                        <PiggyBank className="h-4 w-4 mr-2 text-purple-600" />
                        Banca
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                      Encuentre cuentas corrientes para estudiantes sin tarifas y busque tarjetas de crédito diseñadas para que los estudiantes
                      construir crédito.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

