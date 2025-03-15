import { Award, Users, Shield, Sparkles } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
       <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-xl font-bold">FinanceAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/ai-advisor">
            AI Advisor
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/history">
            History
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
            About Us
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-3xl font-bold mb-8">About FinanceAI</h1>

        <div className="space-y-12">
          <section>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                    <p className="text-gray-700 leading-relaxed">
                      FinanceAI is a pioneering financial technology company that combines artificial intelligence with
                      financial expertise to provide personalized financial advice at scale. Founded in 2018, we've
                      grown from a small startup to a global enterprise serving clients across 30+ countries.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Our team consists of financial experts, data scientists, and AI engineers who are passionate about
                      making financial advice accessible to everyone. We believe that technology can democratize access
                      to high-quality financial guidance and help people make better financial decisions.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="FinanceAI Team"
                        className="object-cover"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle>Client First</CardTitle>
                    <CardDescription>We prioritize our clients' needs above all else</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Every decision we make is guided by what's best for our clients. We're committed to providing
                    unbiased advice that helps our clients achieve their financial goals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle>Security & Privacy</CardTitle>
                    <CardDescription>Your financial data is safe with us</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We employ enterprise-grade security measures to protect your financial data. Your privacy is
                    paramount, and we never sell your personal information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle>Innovation</CardTitle>
                    <CardDescription>Constantly improving our technology</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We're always pushing the boundaries of what's possible with AI and financial technology. Our R&D
                    team works tirelessly to improve our algorithms and user experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Award className="h-8 w-8 text-purple-600" />
                  <div>
                    <CardTitle>Excellence</CardTitle>
                    <CardDescription>Committed to the highest standards</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We hold ourselves to the highest standards in everything we do, from the accuracy of our financial
                    advice to the quality of our customer service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  title: "CEO & Co-Founder",
                  bio: "Former investment banker with 15+ years of experience in financial services.",
                },
                {
                  name: "Michael Chen",
                  title: "CTO & Co-Founder",
                  bio: "AI researcher with a PhD in Machine Learning from Stanford University.",
                },
                {
                  name: "David Rodriguez",
                  title: "Chief Financial Officer",
                  bio: "Certified Financial Planner with experience at top financial institutions.",
                },
                {
                  name: "Emily Williams",
                  title: "Chief Product Officer",
                  bio: "Product leader with experience at leading fintech companies.",
                },
                {
                  name: "James Wilson",
                  title: "Chief Marketing Officer",
                  bio: "Digital marketing expert specializing in financial services.",
                },
                {
                  name: "Aisha Patel",
                  title: "Head of Customer Success",
                  bio: "Dedicated to ensuring clients achieve their financial goals.",
                },
              ].map((person, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-purple-100 mb-4 flex items-center justify-center">
                        <span className="text-purple-600 text-2xl font-bold">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <h3 className="font-bold">{person.name}</h3>
                      <p className="text-sm text-purple-600 mb-2">{person.title}</p>
                      <p className="text-sm text-gray-500">{person.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Achievements</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-100 p-1 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Best Fintech Startup 2022</h3>
                      <p className="text-gray-700">Recognized for our innovative approach to financial advice.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-100 p-1 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Top 10 AI Companies to Watch</h3>
                      <p className="text-gray-700">Featured in Forbes' annual list of innovative AI companies.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-100 p-1 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">1 Million Users Milestone</h3>
                      <p className="text-gray-700">Reached 1 million users on our platform in 2023.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 mt-1 bg-purple-100 p-1 rounded-full">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Customer Satisfaction Excellence</h3>
                      <p className="text-gray-700">
                        Maintained a 4.8/5 customer satisfaction rating for 3 consecutive years.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

