import { MapPin, Target, Compass } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
      {/* Responsive header */}
import Link from "next/link"
import { Menu, Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function HistoryPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-xl font-bold">FinanceAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
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
                    <span className="ml-2 text-xl font-bold">FinanceAI</span>
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
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Get Started</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Our History</h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Target className="mr-2 h-6 w-6 text-purple-600" />
              Our Mission
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 leading-relaxed">
                  At FinanceAI, our mission is to democratize financial advice through innovative technology. We believe
                  that everyone deserves access to high-quality financial guidance, regardless of their wealth or
                  background. By leveraging artificial intelligence, we're able to provide personalized financial
                  recommendations at scale, helping individuals and businesses make smarter financial decisions.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We're committed to transparency, security, and putting our clients' interests first. Our AI-powered
                  platform is designed to analyze complex financial data and translate it into actionable insights that
                  are easy to understand and implement.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Compass className="mr-2 h-6 w-6 text-purple-600" />
              Our Vision
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 leading-relaxed">
                  We envision a future where financial well-being is accessible to all. Our vision is to become the
                  world's most trusted AI financial advisor, helping millions of people achieve their financial goals
                  and build a secure future.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  By 2030, we aim to have helped over 10 million individuals and businesses optimize their finances,
                  save more effectively, and invest wisely. We're working toward a world where financial stress is
                  reduced and people can focus on what truly matters in their lives.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-purple-600" />
              Our Location
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Headquarters</h3>
                    <p className="text-gray-700">
                      123 Financial District
                      <br />
                      Suite 500
                      <br />
                      New York, NY 10004
                      <br />
                      United States
                    </p>
                    <p className="text-gray-700 mt-4">
                      <strong>Phone:</strong> +1 (555) 123-4567
                      <br />
                      <strong>Email:</strong> info@financeai.com
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Regional Offices</h3>
                    <p className="text-gray-700">
                      <strong>San Francisco</strong>
                      <br />
                      555 Tech Avenue
                      <br />
                      San Francisco, CA 94103
                    </p>
                    <p className="text-gray-700 mt-4">
                      <strong>London</strong>
                      <br />
                      10 Fintech Square
                      <br />
                      London, EC2A 4XY
                      <br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                <div className="mt-6 rounded-lg overflow-hidden border h-[300px] bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Interactive map would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Journey</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>2018</CardTitle>
                  <CardDescription>The Beginning</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Founded by a team of financial experts and AI engineers with a vision to transform financial advice
                    through technology.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2020</CardTitle>
                  <CardDescription>Growth & Innovation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Launched our first AI-powered financial advisory platform and secured Series A funding to accelerate
                    development and expansion.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2022</CardTitle>
                  <CardDescription>Enterprise Solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Expanded our services to include enterprise solutions, helping businesses optimize their financial
                    operations and provide better financial benefits to employees.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today</CardTitle>
                  <CardDescription>Global Impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Serving clients across 30+ countries with state-of-the-art AI financial advisory services,
                    continuously innovating to improve financial outcomes for individuals and businesses.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

