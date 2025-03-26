"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer } from "@/components/ui/chart"
import { AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const depressionSymptoms = [
  { name: "Low Mood", value: 3, fullMark: 5 },
  { name: "Loss of Interest", value: 4, fullMark: 5 },
  { name: "Sleep Issues", value: 5, fullMark: 5 },
  { name: "Fatigue", value: 3, fullMark: 5 },
  { name: "Appetite Changes", value: 2, fullMark: 5 },
  { name: "Concentration", value: 4, fullMark: 5 },
  { name: "Self-Worth", value: 3, fullMark: 5 },
]

const anxietySymptoms = [
  { name: "Worry", value: 4, fullMark: 5 },
  { name: "Restlessness", value: 3, fullMark: 5 },
  { name: "Tension", value: 5, fullMark: 5 },
  { name: "Avoidance", value: 2, fullMark: 5 },
  { name: "Racing Heart", value: 4, fullMark: 5 },
  { name: "Breathing", value: 3, fullMark: 5 },
  { name: "Concentration", value: 2, fullMark: 5 },
]

const stressSymptoms = [
  { name: "Overwhelmed", value: 5, fullMark: 5 },
  { name: "Irritability", value: 3, fullMark: 5 },
  { name: "Headaches", value: 2, fullMark: 5 },
  { name: "Procrastination", value: 4, fullMark: 5 },
  { name: "Sleep Issues", value: 3, fullMark: 5 },
  { name: "Muscle Tension", value: 2, fullMark: 5 },
  { name: "Social Withdrawal", value: 4, fullMark: 5 },
]

export default function SymptomVisualizer() {
  const [activeTab, setActiveTab] = useState("depression")

  const getSymptomData = () => {
    switch (activeTab) {
      case "depression":
        return depressionSymptoms
      case "anxiety":
        return anxietySymptoms
      case "stress":
        return stressSymptoms
      default:
        return depressionSymptoms
    }
  }

  const getSymptomDescription = () => {
    switch (activeTab) {
      case "depression":
        return "Depression symptoms often include persistent sadness, loss of interest in activities, sleep disturbances, and feelings of worthlessness."
      case "anxiety":
        return "Anxiety symptoms typically include excessive worry, restlessness, feeling on edge, and physical symptoms like racing heart or shortness of breath."
      case "stress":
        return "Academic stress can manifest as feeling overwhelmed, irritability, difficulty concentrating, and physical symptoms like headaches or muscle tension."
      default:
        return ""
    }
  }

  const getAlertContent = () => {
    switch (activeTab) {
      case "depression":
        return {
          title: "Depression Symptoms",
          description:
            "Your symptom profile shows elevated levels of sleep issues and loss of interest, which are key indicators of depression.",
        }
      case "anxiety":
        return {
          title: "Anxiety Symptoms",
          description:
            "Your symptom profile shows significant tension and worry, which are common features of anxiety disorders.",
        }
      case "stress":
        return {
          title: "Stress Symptoms",
          description:
            "Your symptom profile indicates you're feeling overwhelmed and experiencing procrastination, common responses to academic stress.",
        }
      default:
        return { title: "", description: "" }
    }
  }

  const alertContent = getAlertContent()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Symptom Visualization</CardTitle>
          <CardDescription>Visualize your symptoms to better understand your mental health patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="depression" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="depression">Depression</TabsTrigger>
              <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
              <TabsTrigger value="stress">Academic Stress</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <ChartContainer className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getSymptomData()}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 5]} />
                        <Radar name="Symptoms" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Understanding {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{getSymptomDescription()}</p>
                  </div>

                  <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <AlertTitle className="text-amber-700 dark:text-amber-300">{alertContent.title}</AlertTitle>
                    <AlertDescription className="text-amber-600 dark:text-amber-400">
                      {alertContent.description}
                    </AlertDescription>
                  </Alert>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-700 dark:text-blue-300">Severity Scale</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          0-1: Minimal | 2-3: Moderate | 4-5: Severe
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Common Depression Symptoms in Students</CardTitle>
          <CardDescription>Understanding how depression manifests in academic settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2 text-red-600 dark:text-red-400">Academic Performance</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Declining grades or academic performance</li>
                <li>• Difficulty concentrating during lectures</li>
                <li>• Procrastination and missed deadlines</li>
                <li>• Loss of interest in previously enjoyed subjects</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2 text-amber-600 dark:text-amber-400">Social Changes</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Withdrawal from social activities</li>
                <li>• Reduced participation in class discussions</li>
                <li>• Avoiding group projects or study sessions</li>
                <li>• Isolation from friends and roommates</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2 text-blue-600 dark:text-blue-400">Physical Symptoms</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Changes in sleep patterns (insomnia or oversleeping)</li>
                <li>• Fatigue and low energy during classes</li>
                <li>• Changes in appetite and eating habits</li>
                <li>• Unexplained headaches or body pains</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2 text-green-600 dark:text-green-400">Emotional Signs</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Persistent sadness or emptiness</li>
                <li>• Feelings of hopelessness about academic future</li>
                <li>• Irritability or frustration over minor issues</li>
                <li>• Overwhelming guilt about academic performance</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2 text-purple-600 dark:text-purple-400">Cognitive Patterns</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Negative thoughts about academic abilities</li>
                <li>• Difficulty making decisions about courses</li>
                <li>• Self-critical thoughts about intelligence</li>
                <li>• Catastrophizing about academic failures</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2 text-indigo-600 dark:text-indigo-400">Behavioral Changes</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Increased absences from classes</li>
                <li>• Substance use as a coping mechanism</li>
                <li>• Neglecting personal hygiene or appearance</li>
                <li>• Restlessness or agitation during exams</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

