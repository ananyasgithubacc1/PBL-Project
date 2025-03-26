"use client"

import type React from "react"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface QuestionProps {
  question: {
    id: number
    text: string
    options?: string[]
    type?: string
  }
  answer: any
  onAnswer: (id: number, answer: any) => void
}

export default function QuestionItem({ question, answer, onAnswer }: QuestionProps) {
  const handleRadioChange = (value: string) => {
    onAnswer(question.id, value)
  }

  const handleSliderChange = (value: number[]) => {
    onAnswer(question.id, value[0])
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value)) {
      onAnswer(question.id, value)
    }
  }

  const renderQuestionInput = () => {
    if (question.type === "scale") {
      return (
        <div className="w-full mt-4">
          <div className="flex justify-between mb-2 text-sm text-gray-500">
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
          <Slider
            defaultValue={answer ? [answer] : [5]}
            max={10}
            step={1}
            onValueChange={handleSliderChange}
            className="mb-6"
          />
          <div className="text-center text-lg font-medium mt-2">{answer !== undefined ? answer : "-"}</div>
        </div>
      )
    } else if (question.type === "integerInput") {
      return (
        <div className="w-full max-w-xs mx-auto mt-4">
          <Input
            type="number"
            value={answer || ""}
            onChange={handleNumberChange}
            className="text-center text-lg"
            placeholder="Enter hours"
          />
        </div>
      )
    } else if (question.options) {
      return (
        <RadioGroup value={answer} onValueChange={handleRadioChange} className="mt-4 space-y-3">
          {question.options.map((option) => (
            <motion.div
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer transition-colors"
              onClick={() => handleRadioChange(option)}
            >
              <RadioGroupItem value={option} id={`option-${option}`} className="mr-3" />
              <Label htmlFor={`option-${option}`} className="w-full cursor-pointer">
                {option}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      )
    }

    return null
  }

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-xl font-medium mb-4 text-gray-800 dark:text-gray-100 flex items-center">
        <span className="flex justify-center items-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-bold mr-3">
          {question.id}
        </span>
        {question.text}
      </h2>

      {renderQuestionInput()}
    </div>
  )
}

