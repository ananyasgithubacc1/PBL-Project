"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MentalHealthAssessment from "@/app/Components/mental-health-assessment"
import MoodTracker from "@/app/Components/mood-tracker"
import ResourceHub from "@/app/Components/resource-hub"
import SymptomVisualizer from "@/app/Components/symptom-visualizer"
import SelfCareTools from "@/app/Components/self-care-tools"
import JournalFeature from "@/app/Components/journal-feature"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("assessment")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Student Mental Wellness Center</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive platform to assess, track, and improve your mental wellbeing
          </p>
        </header>

        <Tabs defaultValue="assessment" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="assessment" className="text-sm">
              Assessment
            </TabsTrigger>
            <TabsTrigger value="mood" className="text-sm">
              Mood Tracker
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="text-sm">
              Symptoms
            </TabsTrigger>
            <TabsTrigger value="selfcare" className="text-sm">
              Self-Care
            </TabsTrigger>
            <TabsTrigger value="journal" className="text-sm">
              Journal
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-sm">
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessment">
            <MentalHealthAssessment />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="symptoms">
            <SymptomVisualizer />
          </TabsContent>

          <TabsContent value="selfcare">
            <SelfCareTools />
          </TabsContent>

          <TabsContent value="journal">
            <JournalFeature />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceHub />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

