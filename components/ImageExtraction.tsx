"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ImageIcon, Loader2, Upload, Check, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

export function ImageExtraction() {
    const t = useTranslations()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [result, setResult] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            processFile(file)
        }
    }

    const processFile = useCallback((file: File) => {
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        setResult("")
        setError(null)
        toast.success(`${file.name} ${t('imageExtraction.fileReady')}`)
    }, [t])

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.dataTransfer.files?.length) {
            processFile(e.dataTransfer.files[0])
        }
    }, [processFile])

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const processImage = async () => {
        if (!selectedFile) return

        setLoading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("image", selectedFile)
            formData.append("mode", "text")

            const response = await fetch("/api/image", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (response.status === 429) {
                toast.error(data.error || t("imageExtraction.errors.rateLimitExceeded"))
                return
            }

            if (!response.ok) {
                throw new Error(data.error || "Failed to process image")
            }

            setResult(data.text)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
            setResult("")
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            toast(t('imageExtraction.result.copySuccess'))
        }
    }

    const resetFile = () => {
        setSelectedFile(null)
        setPreviewUrl(null)
        setResult("")
        setError(null)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 bg-gradient-to-br from-background to-muted/50">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-2xl font-bold flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    {t('imageExtraction.title')}
                </CardTitle>
                <CardDescription className="text-base">
                    {t('imageExtraction.description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div
                    className={cn(
                        "border-2 border-dashed rounded-xl p-4 md:p-6 transition-all duration-200 ease-in-out",
                        "flex flex-col items-center justify-center text-center min-h-[200px] md:min-h-[300px]",
                        selectedFile ? "border-primary/50 bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                    )}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    {!previewUrl ? (
                        <>
                            <div className="w-16 h-16 md:w-20 md:h-20 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                <Upload className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                            </div>
                            <h3 className="text-lg md:text-xl font-medium mb-1">{t('imageExtraction.upload.dragDrop')}</h3>
                            <p className="text-sm md:text-base text-muted-foreground mb-4">{t('imageExtraction.upload.browseFiles')}</p>
                            <Button variant="outline" className="relative">
                                {t('imageExtraction.upload.chooseFile')}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </Button>
                        </>
                    ) : (
                        <div className="w-full flex flex-col items-center">
                            <div className="relative group mb-4 w-full max-w-md">
                                <Image
                                    src={previewUrl || "/placeholder.svg"}
                                    alt="Preview"
                                    className="max-h-64 w-auto object-contain rounded-lg border border-border shadow-md"
                                    width={400}
                                    height={400}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 bg-background/80 hover:bg-background rounded-full p-2"
                                    onClick={resetFile}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground truncate max-w-full">{selectedFile?.name}</p>
                        </div>
                    )}
                </div>

                <Button
                    onClick={processImage}
                    disabled={!selectedFile || loading}
                    className="w-full text-base md:text-lg"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {t('imageExtraction.processing')}
                        </>
                    ) : (
                        t('imageExtraction.generateText')
                    )}
                </Button>

                {error && (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-lg animate-in fade-in-50 duration-300">
                        <h3 className="font-semibold mb-2">{t('imageExtraction.errors.error')}</h3>
                        <p className="text-sm md:text-base">{error}</p>
                    </div>
                )}

                {result && (
                    <div className="p-4 md:p-6 bg-card border rounded-lg shadow-sm animate-in fade-in-50 duration-300">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-lg md:text-xl">{t('imageExtraction.result.title')}</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-3 rounded-full"
                                onClick={copyToClipboard}
                            >
                                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                            </Button>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md">
                            <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{result}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 