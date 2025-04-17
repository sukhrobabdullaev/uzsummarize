"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface StudyNotes {
    mainConcepts: string[]
    examples: string[]
    keyPoints: string[]
    summary: string
}

export function StudyNotes() {
    const [topic, setTopic] = useState("")
    const [difficulty, setDifficulty] = useState("beginner")
    const [notes, setNotes] = useState<StudyNotes | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleGenerateNotes = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/study-notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: topic, difficulty }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate notes")
            }

            const data = await response.json()
            setNotes(data)
        } catch (err) {
            setError("Failed to generate study notes. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>O'quv eslatmalar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="O'quv mavzusini kiriting (masalan: 'Fotosintez', 'Dunyoning II jahon urushi', 'Python funksiyalari')"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="text-base"
                        />
                        <p className="text-sm text-muted-foreground">
                            O'quv mavzusini kiriting
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select
                            value={difficulty}
                            onValueChange={setDifficulty}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Qiyinlik darajasi tanlash" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Boshlang'ich</SelectItem>
                                <SelectItem value="intermediate">O'rta</SelectItem>
                                <SelectItem value="advanced">Qiyin</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={handleGenerateNotes}
                            disabled={loading}
                            className="min-w-[140px]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Ishlanmoqda...
                                </>
                            ) : (
                                "Eslatmalar olish"
                            )}
                        </Button>
                    </div>
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </CardContent>
            </Card>

            {notes && (
                <Card>
                    <CardHeader>
                        <CardTitle>O'quv eslatmalar "{topic}"</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">Asosiy tushunchalar</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                {notes.mainConcepts.map((concept, index) => (
                                    <li key={index}>{concept}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Misollar</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                {notes.examples.map((example, index) => (
                                    <li key={index}>{example}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Asosiy fikrlar</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                {notes.keyPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Xulosa</h3>
                            <p className="text-muted-foreground">{notes.summary}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
} 