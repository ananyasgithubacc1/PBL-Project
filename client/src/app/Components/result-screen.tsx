"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ResultScreenProps {
  result: {
    hasPotentialDepression: boolean
    score: number
    message: string
  } | null
  onReset: () => void
}

export default function ResultScreen({ result, onReset }: ResultScreenProps) {
  if (!result) return null

  const getResultColor = () => {
    if (result.hasPotentialDepression) {
      return "from-amber-500 to-red-500"
    }
    return "from-green-500 to-teal-500"
  }

  const getResultIcon = () => {
    if (result.hasPotentialDepression) {
      return <AlertTriangle size={80} className="text-amber-500" />
    }
    return <CheckCircle size={80} className="text-green-500" />
  }

  const getResultTitle = () => {
    if (result.hasPotentialDepression) {
      return "Potential Signs of Depression Detected"
    }
    return "No Significant Signs of Depression"
  }

  const getResultDescription = () => {
    if (result.hasPotentialDepression) {
      return "Based on your responses, you may be experiencing some symptoms associated with depression. We recommend consulting with a mental health professional for a proper evaluation."
    }
    return "Based on your responses, you don't appear to be showing significant signs of depression. However, mental health is complex and can change over time."
  }

  const getResourcesContent = () => {
    return (
      <div className="mt-8">
        <h3 className="font-bold text-lg mb-2 dark:text-white">Mental Health Resources</h3>
        <ul className="space-y-2 text-left list-disc list-inside dark:text-gray-300">
          <li>National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
          <li>Crisis Text Line: Text HOME to 741741</li>
          <li>Student Counseling Services at your university</li>
          <li>Schedule an appointment with your primary care physician</li>
        </ul>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="flex justify-center mb-6">{getResultIcon()}</div>

      <h2 className="text-2xl font-bold mb-4 dark:text-white">{getResultTitle()}</h2>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getResultColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${result.score}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">{getResultDescription()}</p>

      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-6 text-left">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-700 dark:text-blue-300">Important Note</AlertTitle>
        <AlertDescription className="text-blue-600 dark:text-blue-400">{result.message}</AlertDescription>
      </Alert>

      {result.hasPotentialDepression && getResourcesContent()}

      <Button onClick={onReset} variant="outline" className="mt-6">
        Take Assessment Again
      </Button>
    </motion.div>
  )
}

