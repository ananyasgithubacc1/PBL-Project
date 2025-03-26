"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Phone, Calendar, GraduationCap, Heart, Headphones, BookMarked, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ResourceHub() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mental Health Resources</CardTitle>
          <CardDescription>Support services and resources for students experiencing depression</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="campus">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="campus">
                <GraduationCap className="h-4 w-4 mr-2" />
                Campus
              </TabsTrigger>
              <TabsTrigger value="community">
                <Heart className="h-4 w-4 mr-2" />
                Community
              </TabsTrigger>
              <TabsTrigger value="digital">
                <Headphones className="h-4 w-4 mr-2" />
                Digital
              </TabsTrigger>
            </TabsList>

            <TabsContent value="campus" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Counseling Center</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                      >
                        Free for Students
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Professional counselors offering individual therapy, group sessions, and crisis intervention.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span>555-123-4567</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Mon-Fri: 9am-5pm</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Student Center, Room 302</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Schedule Appointment</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Peer Support Network</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      >
                        Student-Led
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Trained student volunteers providing confidential peer support and resources.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span>555-987-6543</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Drop-in Hours: Mon-Thu 6pm-9pm</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Student Union, Room 105</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Join Support Group
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Crisis Hotlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium mb-1">National Suicide Prevention Lifeline</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          24/7 support for people in distress
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>988 or 1-800-273-8255</span>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium mb-1">Crisis Text Line</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Text-based crisis support</p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>Text HOME to 741741</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Community Mental Health Centers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium mb-1">City Mental Health Clinic</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          Sliding scale fees based on income
                        </p>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span>555-789-0123</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                          <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                          <span>123 Main Street</span>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium mb-1">Student Discount Therapy Network</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          Reduced rates for students with valid ID
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Find a Therapist
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="digital" className="mt-0">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Mental Health Apps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 flex-shrink-0">
                          <Headphones className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Calm</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Meditation and sleep stories</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-300 flex-shrink-0">
                          <BookMarked className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Woebot</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">AI-based CBT chatbot</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 flex-shrink-0">
                          <Heart className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Daylio</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Mood tracking journal</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Online Therapy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-300 flex-shrink-0">
                          <Phone className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">BetterHelp</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Online counseling platform</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 flex-shrink-0">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Talkspace</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Text, audio, and video therapy</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-300 flex-shrink-0">
                          <GraduationCap className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">7 Cups</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Free peer counseling for students</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Educational Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 flex-shrink-0">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">NAMI</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            National Alliance on Mental Illness
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-300 flex-shrink-0">
                          <BookMarked className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">ULifeline</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">College mental health resources</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center text-pink-600 dark:text-pink-300 flex-shrink-0">
                          <Heart className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Active Minds</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Student mental health advocacy</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg w-full">
            <h3 className="font-medium text-red-700 dark:text-red-300 mb-2">In Case of Emergency</h3>
            <p className="text-sm text-red-600 dark:text-red-400">
              If you or someone you know is in immediate danger, call emergency services (911) or go to your nearest
              emergency room. For 24/7 crisis support, call the National Suicide Prevention Lifeline at 988.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

