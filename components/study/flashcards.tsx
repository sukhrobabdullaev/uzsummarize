"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface Flashcard {
    id: string
    front: string
    back: string
    topic: string
    difficulty: string
}

export function Flashcards() {
    const [topic, setTopic] = useState("")
    const [difficulty, setDifficulty] = useState("beginner")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)

    const handleGenerateFlashcards = async () => {
        if (!topic.trim()) {
            setError("Iltimos, mavzuni kiriting")
            toast.error("Iltimos, mavzuni kiriting")
            return
        }

        setLoading(true)
        setError("")
        const toastId = toast.loading("Flashcardlar yaratilmoqda...")

        try {
            const response = await fetch("/api/flashcards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, difficulty }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Server xatosi")
            }

            const data = await response.json()
            setFlashcards(data)
            setCurrentIndex(0)
            setShowAnswer(false)
            toast.success("Flashcardlar muvaffaqiyatli yaratildi", { id: toastId })
        } catch (error) {
            console.error("Error generating flashcards:", error)
            const errorMessage = error instanceof Error ? error.message : "Flashcardlarni yaratishda xatolik yuz berdi"
            setError(errorMessage)
            toast.error(errorMessage, { id: toastId })
        } finally {
            setLoading(false)
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            setShowAnswer(false)
        }
    }

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setShowAnswer(false)
        }
    }

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer)
    }

    const currentCard = flashcards[currentIndex]

    return (
        <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-md w-full">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Flashcardlar
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                        Mavzu va darajani tanlang, so'ng flashcardlarni yarating
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4">
                            <Input
                                placeholder="Mavzu kiriting (masalan: 'Amir Temur', 'O'zbekiston tarixi', 'Python asoslari')"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full"
                            />
                            <Select value={difficulty} onValueChange={setDifficulty}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <SelectValue placeholder="Darajani tanlang" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Boshlang'ich</SelectItem>
                                    <SelectItem value="intermediate">O'rta</SelectItem>
                                    <SelectItem value="advanced">Yuqori</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button onClick={handleGenerateFlashcards} disabled={loading} className="w-full md:w-auto">
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span className="hidden sm:inline">Yaratilmoqda...</span>
                                        <span className="sm:hidden">...</span>
                                    </>
                                ) : (
                                    "Yaratish"
                                )}
                            </Button>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                </CardContent>
            </Card>

            {flashcards.length > 0 && (
                <Card className="border border-slate-200 dark:border-slate-700 shadow-md w-full">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 break-words">
                            {currentCard.topic}
                        </CardTitle>
                        <CardDescription className="text-sm">
                            {difficulty === "beginner" ? "Boshlang'ich" : difficulty === "intermediate" ? "O'rta" : "Yuqori"} daraja
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="min-h-[300px] sm:h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col justify-center items-center text-center">
                            <h3 className="text-base sm:text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                                {showAnswer ? currentCard.back : currentCard.front}
                            </h3>
                            <Button
                                variant="outline"
                                onClick={toggleAnswer}
                                className="mt-4"
                                size="sm"
                            >
                                {showAnswer ? (
                                    <>
                                        <EyeOff className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">Savolni ko'rsatish</span>
                                        <span className="sm:hidden">Savol</span>
                                    </>
                                ) : (
                                    <>
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">Javobni ko'rsatish</span>
                                        <span className="sm:hidden">Javob</span>
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="flex justify-between items-center mt-6 gap-2">
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                size="sm"
                                className="text-sm"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                <span className="hidden sm:inline">Oldingi</span>
                            </Button>
                            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                                {currentIndex + 1} / {flashcards.length}
                            </span>
                            <Button
                                variant="outline"
                                onClick={handleNext}
                                disabled={currentIndex === flashcards.length - 1}
                                size="sm"
                                className="text-sm"
                            >
                                <span className="hidden sm:inline">Keyingi</span>
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}