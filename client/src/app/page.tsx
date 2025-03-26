import type { Metadata } from "next"
import DashboardPage from "@/app/Components/dashboard-page"

export const metadata: Metadata = {
  title: "Student Mental Health Assessment",
  description: "A comprehensive tool to help assess and manage mental health concerns among students",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <DashboardPage />
    </main>
  )
}

