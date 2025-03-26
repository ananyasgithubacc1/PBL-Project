"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Save, List, PlusCircle, Edit, Trash2, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock journal entries
const mockEntries = [
  {
    id: "1",
    date: new Date(2023, 9, 15),
    title: "Midterm Stress",
    content: "Feeling overwhelmed with upcoming exams. Need to create a better study schedule.",
    mood: "stressed",
  },
  {
    id: "2",
    date: new Date(2023, 9, 17),
    title: "Group Project Progress",
    content: "Made good progress on our psychology project today. The team is working well together.",
    mood: "positive",
  },
  {
    id: "3",
    date: new Date(2023, 9, 20),
    title: "Trouble Sleeping",
    content: "Had difficulty sleeping last night. Worried about the presentation tomorrow.",
    mood: "negative",
  },
]

export default function JournalFeature() {
  const [date, setDate] = useState<Date>(new Date())
  const [entries, setEntries] = useState(mockEntries)
  const [activeTab, setActiveTab] = useState("write")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState<"positive" | "neutral" | "negative" | "stressed" | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

  const handleSaveEntry = () => {
    if (!title || !content || !mood) return

    if (selectedEntry) {
      // Update existing entry
      setEntries(
        entries.map((entry) => (entry.id === selectedEntry ? { ...entry, title, content, mood, date } : entry)),
      )
      setSelectedEntry(null)
    } else {
      // Create new entry
      const newEntry = {
        id: Date.now().toString(),
        date,
        title,
        content,
        mood,
      }
      setEntries([newEntry, ...entries])
    }

    // Reset form
    setTitle("")
    setContent("")
    setMood(null)
    setActiveTab("list")
  }

  const handleEditEntry = (id: string) => {
    const entry = entries.find((e) => e.id === id)
    if (entry) {
      setTitle(entry.title)
      setContent(entry.content)
      setMood(entry.mood)
      setDate(entry.date)
      setSelectedEntry(id)
      setActiveTab("write")
    }
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const handleNewEntry = () => {
    setTitle("")
    setContent("")
    setMood(null)
    setDate(new Date())
    setSelectedEntry(null)
    setActiveTab("write")
  }

  const getMoodIcon = (entryMood: string) => {
    switch (entryMood) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500" />
      case "stressed":
        return <Lightbulb className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mood Journal</CardTitle>
            <CardDescription>Track your thoughts, feelings, and experiences</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleNewEntry}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="write">
              <Edit className="h-4 w-4 mr-2" />
              Write
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" />
              Entries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="mt-0">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Entry title" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Journal Entry</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your thoughts here..."
                  className="min-h-[150px]"
                />
              </div>

              <div className="grid gap-2">
                <Label>How are you feeling?</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "flex-1",
                      mood === "positive" &&
                        "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
                    )}
                    onClick={() => setMood("positive")}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Good
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "flex-1",
                      mood === "negative" &&
                        "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
                    )}
                    onClick={() => setMood("negative")}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Low
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "flex-1",
                      mood === "stressed" &&
                        "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300",
                    )}
                    onClick={() => setMood("stressed")}
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Stressed
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={handleSaveEntry} disabled={!title || !content || !mood}>
                <Save className="h-4 w-4 mr-2" />
                {selectedEntry ? "Update Entry" : "Save Entry"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            {entries.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No journal entries yet</p>
                <Button variant="outline" className="mt-4" onClick={handleNewEntry}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create your first entry
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{entry.title}</h3>
                        {getMoodIcon(entry.mood)}
                      </div>
                      <div className="text-xs text-gray-500">{format(entry.date, "MMM d, yyyy")}</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{entry.content}</p>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditEntry(entry.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg w-full">
          <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
            Benefits of Journaling for Mental Health
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Regular journaling can help identify triggers for depression and anxiety, track mood patterns, and provide
            an emotional outlet. It's also a helpful tool to share with mental health professionals.
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

