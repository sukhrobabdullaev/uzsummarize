"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Loader2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function PdfSummarization() {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [model, setModel] = useState<"GPT" | "GEMINI">("GPT")
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setError(null)

      // Create a preview URL for the PDF
      const fileUrl = URL.createObjectURL(selectedFile)
      setPdfPreview(fileUrl)
    } else {
      setFile(null)
      setError("Please select a valid PDF file")
      setPdfPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError("Please select a PDF file")
      return
    }

    setLoading(true)
    setError(null)
    setSummary("")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("model", model)

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to summarize PDF")
      }

      setSummary(data.summary)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side - PDF Upload and Controls */}
      <div className="space-y-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                  file ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-border"
                }`}
                onClick={() => document.getElementById("pdf-upload")?.click()}
              >
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        setFile(null)
                        setPdfPreview(null)
                      }}
                    >
                      <X className="h-4 w-4 mr-2" /> Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF (up to 10MB)</p>
                  </div>
                )}
                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {error && (
                <div className="text-sm text-red-500 flex items-center gap-2">
                  <X className="h-4 w-4" />
                  {error}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Select AI Model</h3>
              <RadioGroup
                defaultValue="GPT"
                value={model}
                onValueChange={(value) => setModel(value as "GPT" | "GEMINI")}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="GPT" id="gpt" />
                  <Label htmlFor="gpt" className="cursor-pointer">
                    <div className="font-medium">GPT-4o Mini</div>
                    <div className="text-xs text-muted-foreground">
                      OpenAI&apos;s compact model for efficient summarization
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="GEMINI" id="gemini" />
                  <Label htmlFor="gemini" className="cursor-pointer">
                    <div className="font-medium">Gemini 2.0 Flash</div>
                    <div className="text-xs text-muted-foreground">Google&apos;s fast and efficient summarization model</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={!file || loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                "Summarize PDF"
              )}
            </Button>
          </form>
        </Card>

        {/* PDF Preview */}
        {pdfPreview && (
          <Card className="overflow-hidden">
            <div className="bg-muted p-2 border-b flex items-center justify-between">
              <h3 className="text-sm font-medium">PDF Preview</h3>
            </div>
            <div className="h-[400px]">
              <iframe src={pdfPreview} className="w-full h-full" title="PDF Preview" />
            </div>
          </Card>
        )}
      </div>

      {/* Right side - Summary Results */}
      <div>
        <Card className="h-full">
          <Tabs defaultValue="summary" className="h-full flex flex-col">
            <div className="px-6 pt-6 border-b">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <TabsContent value="summary" className="h-full mt-0 pt-0">
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <h3 className="text-lg font-medium">Generating Summary</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our AI is analyzing your PDF and creating a concise summary...
                    </p>
                  </div>
                ) : summary ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Summary</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      {summary
                        .split("\n")
                        .map((paragraph, i) => (paragraph.trim() ? <p key={i}>{paragraph}</p> : null))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Summary Yet</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload a PDF and click &quot;Summarize PDF&quot; to generate a summary
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="highlights" className="h-full mt-0 pt-0">
                {summary ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Key Highlights</h2>
                    <ul className="space-y-3">
                      {summary
                        .split(".")
                        .filter((sentence) => sentence.trim().length > 10)
                        .slice(0, 5)
                        .map((highlight, i) => (
                          <li key={i} className="flex gap-3">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <p>{highlight.trim()}.</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Highlights Yet</h3>
                    <p className="text-sm text-muted-foreground mt-2">Generate a summary first to see key highlights</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
