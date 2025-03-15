"use client"

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

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface Message {
  role: "user" | "assistant"
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
      role: "assistant",
      content:
        "Hi there! I'm your student finance advisor. I can help you analyze your expenses and find ways to save money. Would you like to start by telling me about your monthly expenses?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showExpenseAnalyzer, setShowExpenseAnalyzer] = useState(false)

  // Student expense categories
  const [expenses, setExpenses] = useState<Expense[]>([
    { category: "Tuition & Fees", amount: 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-purple-600" },
    { category: "Housing", amount: 0, icon: <Home className="h-5 w-5" />, color: "bg-blue-500" },
    { category: "Food", amount: 0, icon: <Utensils className="h-5 w-5" />, color: "bg-green-500" },
    { category: "Books & Supplies", amount: 0, icon: <BookOpen className="h-5 w-5" />, color: "bg-yellow-500" },
    { category: "Transportation", amount: 0, icon: <TrendingUp className="h-5 w-5" />, color: "bg-red-500" },
    { category: "Entertainment", amount: 0, icon: <Gamepad className="h-5 w-5" />, color: "bg-indigo-500" },
    { category: "Coffee & Eating Out", amount: 0, icon: <Coffee className="h-5 w-5" />, color: "bg-orange-500" },
  ])

  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [highImpactAreas, setHighImpactAreas] = useState<string[]>([])

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
        role: "assistant",
        content: getAIResponse(input),
      }
      setMessages((prev) => [...prev, aiResponse])
      setLoading(false)

      // If user mentions expenses, suggest the expense analyzer
      if (
        input.toLowerCase().includes("expense") ||
        input.toLowerCase().includes("spending") ||
        input.toLowerCase().includes("budget") ||
        input.toLowerCase().includes("analyze") ||
        input.toLowerCase().includes("help")
      ) {
        setTimeout(() => {
          const followUpResponse: Message = {
            role: "assistant",
            content:
              "Would you like to use our expense analyzer tool to get a detailed breakdown of your spending? This will help me provide more personalized advice.",
          }
          setMessages((prev) => [...prev, followUpResponse])
          setShowExpenseAnalyzer(true)
        }, 1000)
      }
    }, 1000)
  }

  // Simple mock AI response function focused on student finances
  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("expense") || lowerQuery.includes("spending") || lowerQuery.includes("budget")) {
      return "As a student, tracking your expenses is crucial. The biggest expenses for most students are typically housing, tuition, and food. Which area are you most concerned about?"
    } else if (lowerQuery.includes("tuition") || lowerQuery.includes("fees")) {
      return "Tuition can be a major expense. Have you looked into scholarships, grants, or work-study programs? Many universities also offer payment plans that can help spread out the cost."
    } else if (lowerQuery.includes("housing") || lowerQuery.includes("rent") || lowerQuery.includes("dorm")) {
      return "Housing is often the largest expense after tuition. Consider getting roommates to split costs, looking for housing further from campus (if transportation is affordable), or becoming a Resident Assistant (RA) for reduced or free housing."
    } else if (lowerQuery.includes("food") || lowerQuery.includes("grocery") || lowerQuery.includes("meal")) {
      return "Food costs can add up quickly. Consider meal prepping, using student meal plans efficiently, and limiting eating out. Many grocery stores and restaurants offer student discounts too!"
    } else if (lowerQuery.includes("book") || lowerQuery.includes("supplies")) {
      return "Textbooks can be expensive! Look into renting books, buying used copies, or checking if your library has them. Digital versions are often cheaper, and some professors may have older editions that work just as well."
    } else if (lowerQuery.includes("save") || lowerQuery.includes("saving")) {
      return "Great question! As a student, you can save by using student discounts, buying used textbooks, meal prepping, finding affordable housing with roommates, and using campus resources like the gym and events instead of paying for entertainment."
    } else if (lowerQuery.includes("work") || lowerQuery.includes("job") || lowerQuery.includes("income")) {
      return "Working part-time during school can help with expenses. Look for on-campus jobs that may be more flexible with your class schedule. Also consider internships in your field that provide both income and valuable experience."
    } else if (lowerQuery.includes("loan") || lowerQuery.includes("debt")) {
      return "Student loans should be used carefully. Always exhaust scholarships, grants, and work options first. If you do need loans, federal loans typically have better terms than private ones. And remember, you don't have to accept the full amount offered."
    } else if (lowerQuery.includes("hi") || lowerQuery.includes("hello") || lowerQuery.includes("hey")) {
      return "Hello! I'm your student finance advisor. I can help you manage your expenses, find ways to save money, and make the most of your student budget. What would you like help with today?"
    } else if (lowerQuery.includes("thank")) {
      return "You're welcome! I'm here to help with any other financial questions you might have. Good luck with your studies!"
    } else {
      return "As a student, managing your finances effectively is important. I can help with budgeting, finding ways to save on common expenses like textbooks and food, or maximizing student discounts. What specific area would you like advice on?"
    }
  }

  const handleExpenseChange = (index: number, value: number[]) => {
    const newExpenses = [...expenses]
    newExpenses[index].amount = value[0]
    setExpenses(newExpenses)
  }

  const analyzeExpenses = () => {
    setLoading(true)

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    // Find high impact areas (expenses that are more than 20% of total)
    const highImpact = expenses
      .filter((expense) => expense.amount > 0 && expense.amount / totalExpenses > 0.2)
      .map((expense) => expense.category)

    setHighImpactAreas(highImpact)

    setTimeout(() => {
      setAnalysisComplete(true)
      setLoading(false)

      // Add analysis message
      const analysisMessage: Message = {
        role: "assistant",
        content: `Based on your expense breakdown, I've analyzed your spending patterns. ${
          highImpact.length > 0
            ? `Your highest impact expenses are in ${highImpact.join(", ")}. Let's focus on these areas to make the biggest difference in your budget.`
            : "Your expenses seem fairly balanced across categories."
        } Would you like specific tips on how to reduce any particular expense category?`,
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
    setHighImpactAreas([])
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Finance Advisor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-purple-900 to-black text-white">
                <CardTitle>Student Finance Assistant</CardTitle>
                <CardDescription className="text-gray-200">
                  Get personalized advice for managing your student finances
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto p-4 space-y-4 my-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.role === "assistant" ? "" : "flex-row-reverse space-x-reverse"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          message.role === "assistant" ? "bg-purple-100" : "bg-black text-white"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <Bot className="h-5 w-5 text-purple-600" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.role === "assistant" ? "bg-gray-100 text-gray-800" : "bg-purple-600 text-white"
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

                {showExpenseAnalyzer && !analysisComplete && (
                  <div className="flex justify-start w-full">
                    <div className="max-w-[90%] w-full">
                      <Card className="border-purple-200">
                        <CardHeader className="bg-purple-50 pb-2">
                          <CardTitle className="text-lg">Student Expense Analyzer</CardTitle>
                          <CardDescription>Adjust the sliders to match your monthly expenses</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          {expenses.map((expense, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className={`p-1.5 rounded-full ${expense.color} text-white mr-2`}>
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
                              <span className="font-medium">Total Monthly Expenses</span>
                              <span className="font-bold">${getTotalExpenses()}</span>
                            </div>

                            <Button
                              onClick={analyzeExpenses}
                              className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
                              disabled={getTotalExpenses() === 0}
                            >
                              Analyze My Expenses
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
                          <CardTitle className="text-lg">Your Expense Breakdown</CardTitle>
                          <CardDescription>
                            {highImpactAreas.length > 0
                              ? `High impact areas: ${highImpactAreas.join(", ")}`
                              : "Your expenses are well balanced"}
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
                                    <div className={`p-1.5 rounded-full ${expense.color} text-white mr-2`}>
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
                            <span className="font-medium">Total Monthly</span>
                            <span className="font-bold">${getTotalExpenses()}</span>
                          </div>

                          <div className="pt-2 flex space-x-2">
                            <Button onClick={startNewAnalysis} variant="outline" className="flex-1">
                              Reset
                            </Button>
                            <Button
                              onClick={() =>
                                sendQuickQuestion(`How can I reduce my ${highImpactAreas[0] || "expenses"}?`)
                              }
                              className="flex-1 bg-purple-600 hover:bg-purple-700"
                            >
                              Get Saving Tips
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
                    placeholder="Ask about your student finances..."
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
                <TabsTrigger value="suggestions">Common Questions</TabsTrigger>
                <TabsTrigger value="insights">Student Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="suggestions" className="mt-4 space-y-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                      Textbook Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">How can I save money on textbooks?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => sendQuickQuestion("How can I save money on textbooks?")}
                    >
                      Ask <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <Home className="h-4 w-4 mr-2 text-purple-600" />
                      Housing Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">What are affordable housing options for students?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => sendQuickQuestion("What are affordable housing options for students?")}
                    >
                      Ask <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <Utensils className="h-4 w-4 mr-2 text-purple-600" />
                      Food Budget
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">How can I eat well on a student budget?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => sendQuickQuestion("How can I eat well on a student budget?")}
                    >
                      Ask <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
                      Student Loans
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">What should I know about student loans?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => sendQuickQuestion("What should I know about student loans?")}
                    >
                      Ask <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="insights" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Saving Tips</CardTitle>
                    <CardDescription>Smart ways to make your money go further</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                        Textbooks
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        Rent textbooks, buy used, or check if digital versions are available. Many libraries also have
                        course reserves.
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium flex items-center">
                        <Coffee className="h-4 w-4 mr-2 text-purple-600" />
                        Food & Drinks
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        Meal prep, use campus meal plans efficiently, and bring your own coffee instead of buying daily.
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium flex items-center">
                        <Gamepad className="h-4 w-4 mr-2 text-purple-600" />
                        Entertainment
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        Use student discounts, attend free campus events, and share streaming subscriptions with
                        roommates.
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium flex items-center">
                        <PiggyBank className="h-4 w-4 mr-2 text-purple-600" />
                        Banking
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        Find student checking accounts with no fees and look for credit cards designed for students to
                        build credit.
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

