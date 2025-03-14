"use client"

import type React from "react"

import { useState } from "react"
import { Send, Bot, User, ArrowRight, PiggyBank, DollarSign, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI financial advisor. How can I help you optimize your finances today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

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
    }, 1000)
  }

  // Simple mock AI response function
  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("save") || lowerQuery.includes("saving")) {
      return "Based on your spending patterns, I recommend setting aside 20% of your income for savings. Consider automating transfers to a high-yield savings account on payday."
    } else if (lowerQuery.includes("invest") || lowerQuery.includes("investing")) {
      return "For long-term growth, consider a diversified portfolio with low-cost index funds. Based on your risk profile, a 70/30 split between stocks and bonds might be appropriate."
    } else if (lowerQuery.includes("budget") || lowerQuery.includes("spending")) {
      return "Looking at your recent transactions, I notice you're spending 30% more on dining out compared to last month. Setting a weekly budget for discretionary spending could help you save an extra $250 per month."
    } else {
      return "I'd be happy to provide personalized financial advice. Could you share more details about your specific financial goals or concerns?"
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Financial Advisor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-purple-900 to-black text-white">
                <CardTitle>Financial Assistant</CardTitle>
                <CardDescription className="text-gray-200">
                  Ask questions about your finances and get personalized advice
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
              </CardContent>
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSend} className="flex w-full space-x-2">
                  <Input
                    placeholder="Ask about your finances..."
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
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="suggestions" className="mt-4 space-y-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <PiggyBank className="h-4 w-4 mr-2 text-purple-600" />
                      Savings Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">How can I improve my savings rate?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => {
                        setInput("How can I improve my savings rate?")
                      }}
                    >
                      Ask <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
                      Budget Optimization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">How can I reduce my monthly spending?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => {
                        setInput("How can I reduce my monthly spending?")
                      }}
                    >
                      Ask <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                      Investment Advice
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-500">What investment strategy is right for me?</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-600"
                      onClick={() => {
                        setInput("What investment strategy is right for me?")
                      }}
                    >
                      Ask <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="insights" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Overview</CardTitle>
                    <CardDescription>Connect your accounts to see personalized insights</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Monthly Spending</div>
                      <div className="mt-1 text-2xl font-bold">$2,450</div>
                      <div className="mt-1 text-xs text-gray-500">15% lower than last month</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Savings Rate</div>
                      <div className="mt-1 text-2xl font-bold">18%</div>
                      <div className="mt-1 text-xs text-gray-500">Target: 20%</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Investment Growth</div>
                      <div className="mt-1 text-2xl font-bold">+8.3%</div>
                      <div className="mt-1 text-xs text-gray-500">Year to date</div>
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

