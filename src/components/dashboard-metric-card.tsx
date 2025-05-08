import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface DashboardMetricCardProps {
  title: string
  value: string
  delta: string
  icon: React.ReactNode
  linkText: string
  linkHref: string
}

export function DashboardMetricCard({ title, value, delta, icon, linkText, linkHref }: DashboardMetricCardProps) {
  return (
    <Link href={linkHref} className="block">
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">{icon}</div>
            <span className="text-sm text-gray-500">{delta}</span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
          <div className="mt-4">
            <span className="flex items-center text-sm font-medium text-red-600">
              {linkText}
              <ChevronRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
