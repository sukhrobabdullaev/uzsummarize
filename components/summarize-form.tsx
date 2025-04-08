"use client"

import type React from "react"
import { useState } from "react"
import { toast } from "sonner"
import SummaryResult from "@/components/summarize-result"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, Bot, Eraser, BrainCircuit } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const SummaryForm = () => {
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [model, setModel] = useState("GEMINI")
  const [isLoading, setIsLoading] = useState(false)

  const MIN_CHARS = 300
  const MAX_CHARS = 4000
  const charCount = text.length
  const progress = Math.min((charCount / MIN_CHARS) * 100, 100)
  const isValid = charCount >= MIN_CHARS && charCount <= MAX_CHARS

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (charCount < MIN_CHARS) {
      toast.error(`Please enter at least ${MIN_CHARS} characters`)
      return
    }
    if (charCount > MAX_CHARS) {
      toast.error(`Text exceeds maximum limit of ${MAX_CHARS} characters`)
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, model }),
      })

      const data = await res.json()

      if (res.ok) {
        setSummary(data.summary)
        toast.success("Summary generated successfully!")
      } else {
        toast.error(data.error || "Failed to generate summary")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Server error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setText("")
    setSummary("")
  }

  const getProgressColor = () => {
    if (charCount < MIN_CHARS) return "bg-amber-500"
    if (charCount > MAX_CHARS) return "bg-red-500"
    return "bg-emerald-500"
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Text Summarizer
          </CardTitle>
          <CardDescription>Paste your text below and let AI create a concise summary for you</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-auto space-y-2">
                <Label htmlFor="model" className="text-sm font-medium">
                  AI Model
                </Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="w-full sm:w-[180px] transition-all">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPT" className="flex items-center">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="h-4 w-4 text-emerald-500" />
                        <span>GPT-4o-mini</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="GEMINI">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-violet-500" />
                        <span>gemini-2.0-flash</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 hidden sm:block"></div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="text-sm h-9 px-3"
                disabled={!text.length || isLoading}
              >
                <Eraser className="mr-2 h-3.5 w-3.5" />
                Clear
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="text" className="text-sm font-medium">
                  Your Text
                </Label>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    charCount === 0
                      ? "bg-gray-100 text-gray-500"
                      : charCount < MIN_CHARS
                        ? "bg-amber-100 text-amber-700"
                        : charCount > MAX_CHARS
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {charCount === 0
                    ? "Empty"
                    : charCount < MIN_CHARS
                      ? `${MIN_CHARS - charCount} more needed`
                      : charCount > MAX_CHARS
                        ? `${charCount - MAX_CHARS} over limit`
                        : "Valid length"}
                </span>
              </div>
              <div className="relative group">
                <Textarea
                  id="text"
                  placeholder="Paste your text here to summarize..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px] max-h-[400px] resize-none transition-all duration-200 ease-in-out focus:shadow-lg focus:border-primary/50 hover:border-primary/30 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-md">
                  {charCount}/{MAX_CHARS}
                </div>
              </div>
              <div className="space-y-1">
                <Progress value={progress} className={`h-1.5 rounded-full transition-colors ${getProgressColor()}`} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{MIN_CHARS} min</span>
                  <span>{MAX_CHARS} max</span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 transition-all" disabled={isLoading || !isValid}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Generating Summary...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Generate Summary</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-lg overflow-hidden">
            
              <CardContent>
                <SummaryResult summary={summary} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SummaryForm
