"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Shield, HeartPulse } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="flex justify-center mb-6">
        <HeartPulse size={80} className="text-blue-500" />
      </div>

      <h2 className="text-2xl font-bold mb-4 dark:text-white">Welcome to the Student Mental Health Assessment</h2>

      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
        This assessment helps identify potential depression symptoms in students. Your responses will be analyzed to
        provide insights about your mental wellbeing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <MessageCircle className="mx-auto mb-2 text-blue-500" />
          <h3 className="font-medium dark:text-white">Confidential</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Your responses are private</p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Shield className="mx-auto mb-2 text-blue-500" />
          <h3 className="font-medium dark:text-white">Quick Assessment</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">10 simple questions</p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <HeartPulse className="mx-auto mb-2 text-blue-500" />
          <h3 className="font-medium dark:text-white">Get Insights</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Understand your mental health</p>
        </div>
      </div>

      <div className="text-gray-500 dark:text-gray-400 mb-8 text-sm italic">
        Note: This is not a clinical diagnosis tool. If you&apos;re experiencing severe distress, please seek
        professional help immediately.
      </div>

      <Button
        onClick={onStart}
        size="lg"
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-6 text-lg"
      >
        Start Assessment
      </Button>
    </motion.div>
  )
}

