"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Heart,
  Dumbbell,
  Coffee,
  BookOpen,
  Clock,
  Music,
  Utensils,
  Moon,
  Users,
  CheckCircle2,
  X,
} from "lucide-react"

export default function SelfCareTools() {
  const [activeTab, setActiveTab] = useState("daily")
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  const toggleActivity = (id: string) => {
    if (completedActivities.includes(id)) {
      setCompletedActivities(completedActivities.filter((activityId) => activityId !== id))
    } else {
      setCompletedActivities([...completedActivities, id])
    }
  }

  const calculateProgress = () => {
    const dailyActivities = selfCareActivities.daily.length
    const completed = completedActivities.filter((id) => id.startsWith("daily")).length
    return (completed / dailyActivities) * 100
  }

  const selfCareActivities = {
    daily: [
      {
        id: "daily-1",
        title: "Deep Breathing",
        description: "5 minutes of deep breathing exercises",
        icon: <Brain className="h-5 w-5" />,
      },
      {
        id: "daily-2",
        title: "Hydration",
        description: "Drink at least 8 glasses of water",
        icon: <Coffee className="h-5 w-5" />,
      },
      {
        id: "daily-3",
        title: "Physical Activity",
        description: "30 minutes of walking or exercise",
        icon: <Dumbbell className="h-5 w-5" />,
      },
      {
        id: "daily-4",
        title: "Gratitude",
        description: "Write down 3 things you're grateful for",
        icon: <Heart className="h-5 w-5" />,
      },
      {
        id: "daily-5",
        title: "Sleep Routine",
        description: "Go to bed at a consistent time",
        icon: <Moon className="h-5 w-5" />,
      },
    ],
    academic: [
      {
        id: "academic-1",
        title: "Study Breaks",
        description: "Take a 5-minute break every 25 minutes",
        icon: <Clock className="h-5 w-5" />,
      },
      {
        id: "academic-2",
        title: "Organized Workspace",
        description: "Clear clutter from your study area",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        id: "academic-3",
        title: "Priority List",
        description: "Make a to-do list ordered by importance",
        icon: <CheckCircle2 className="h-5 w-5" />,
      },
      {
        id: "academic-4",
        title: "Reward System",
        description: "Set up rewards for completing tasks",
        icon: <Music className="h-5 w-5" />,
      },
    ],
    social: [
      {
        id: "social-1",
        title: "Connect Daily",
        description: "Reach out to one friend or family member",
        icon: <Users className="h-5 w-5" />,
      },
      {
        id: "social-2",
        title: "Boundaries",
        description: "Practice saying no to additional commitments",
        icon: <X className="h-5 w-5" />,
      },
      {
        id: "social-3",
        title: "Shared Meal",
        description: "Have a meal with someone you care about",
        icon: <Utensils className="h-5 w-5" />,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Self-Care Toolkit</CardTitle>
          <CardDescription>Simple activities to support your mental wellbeing as a student</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Daily Self-Care Progress</h3>
            <Progress value={calculateProgress()} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">
              {completedActivities.filter((id) => id.startsWith("daily")).length} of {selfCareActivities.daily.length}{" "}
              activities completed today
            </p>
          </div>

          <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="daily">Daily Practices</TabsTrigger>
              <TabsTrigger value="academic">Academic Wellness</TabsTrigger>
              <TabsTrigger value="social">Social Connection</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {selfCareActivities.daily.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      completedActivities.includes(activity.id)
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          completedActivities.includes(activity.id)
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {activity.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{activity.title}</h4>
                          {completedActivities.includes(activity.id) && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="academic" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {selfCareActivities.academic.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      completedActivities.includes(activity.id)
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          completedActivities.includes(activity.id)
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {activity.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{activity.title}</h4>
                          {completedActivities.includes(activity.id) && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                {selfCareActivities.social.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      completedActivities.includes(activity.id)
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          completedActivities.includes(activity.id)
                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {activity.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{activity.title}</h4>
                          {completedActivities.includes(activity.id) && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg w-full">
            <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Why Self-Care Matters for Students</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Regular self-care practices can help reduce stress, improve focus, and prevent burnout during academic
              challenges. These activities are designed to fit into a busy student schedule.
            </p>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Depression-Specific Coping Strategies</CardTitle>
          <CardDescription>Evidence-based approaches that can help manage depression symptoms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Behavioral Activation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Schedule small, achievable activities that bring you joy or a sense of accomplishment, even when
                  motivation is low.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    • Attend one class you've been avoiding
                  </div>
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    • Complete a 10-minute study session
                  </div>
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    • Take a short walk between classes
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Thought Challenging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Identify and challenge negative thought patterns that contribute to depression.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    <span className="font-medium">Negative:</span> "I'll never pass this course"
                  </div>
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    <span className="font-medium">Challenge:</span> "What evidence supports this?"
                  </div>
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    <span className="font-medium">Alternative:</span> "I can seek help to improve"
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Social Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Combat isolation by maintaining social connections, even when you feel like withdrawing.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    • Text one friend about your day
                  </div>
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    • Join a study group once a week
                  </div>
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    • Attend one campus event monthly
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

