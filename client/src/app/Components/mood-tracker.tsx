"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Smile, Meh, Frown, AlertCircle, ThumbsUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Mock data for the mood history
const moodHistoryData = [
  { date: "Mon", mood: 2, fill: "var(--color-good)" },
  { date: "Tue", mood: 4, fill: "var(--color-great)" },
  { date: "Wed", mood: 3, fill: "var(--color-okay)" },
  { date: "Thu", mood: 1, fill: "var(--color-bad)" },
  { date: "Fri", mood: 2, fill: "var(--color-good)" },
  { date: "Sat", mood: 3, fill: "var(--color-okay)" },
  { date: "Sun", mood: 4, fill: "var(--color-great)" },
]

export default function MoodTracker() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentMood, setCurrentMood] = useState<number | null>(null)

  const moodOptions = [
    {
      value: 1,
      label: "Feeling Low",
      icon: <Frown className="h-8 w-8" />,
      color: "bg-red-100 text-red-500 border-red-200 hover:bg-red-200",
    },
    {
      value: 2,
      label: "Just Okay",
      icon: <Meh className="h-8 w-8" />,
      color: "bg-amber-100 text-amber-500 border-amber-200 hover:bg-amber-200",
    },
    {
      value: 3,
      label: "Good",
      icon: <Smile className="h-8 w-8" />,
      color: "bg-green-100 text-green-500 border-green-200 hover:bg-green-200",
    },
    {
      value: 4,
      label: "Great",
      icon: <ThumbsUp className="h-8 w-8" />,
      color: "bg-blue-100 text-blue-500 border-blue-200 hover:bg-blue-200",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Daily Mood Check-in</CardTitle>
          <CardDescription>How are you feeling today? Track your mood to identify patterns over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-3">Select your mood:</h3>
            <div className="grid grid-cols-2 gap-3">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCurrentMood(option.value)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-colors ${
                    currentMood === option.value
                      ? option.color + " border-2"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {option.icon}
                  <span className="mt-2 text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full mt-6" disabled={!currentMood}>
            Save Today's Mood
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Mood History</CardTitle>
          <CardDescription>View your mood patterns over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              mood: {
                label: "Mood Level",
              },
              good: {
                label: "Good",
                color: "hsl(var(--chart-2))",
              },
              great: {
                label: "Great",
                color: "hsl(var(--chart-1))",
              },
              okay: {
                label: "Okay",
                color: "hsl(var(--chart-3))",
              },
              bad: {
                label: "Bad",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="aspect-[4/3]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodHistoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4]}
                  tickFormatter={(value) => {
                    const labels = ["", "Low", "Okay", "Good", "Great"]
                    return labels[value] || ""
                  }}
                />
                <Tooltip />
                <Bar dataKey="mood" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-300">Mood Insight</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Your mood has been improving over the weekend. Keep up with activities that boost your wellbeing!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

