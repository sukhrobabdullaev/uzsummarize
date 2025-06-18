"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Volume2, Play, Square, Download, Copy, Check, Globe, Mic, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"

interface Voice {
    id: string
    name: string
    language: string
    gender: "male" | "female"
    description: string
    avatar: string
    preview?: string
}

type Language = "uz" | "en" | "kaa"

export default function TTS() {
    const t = useTranslations()
    const [selectedLanguage, setSelectedLanguage] = useState<Language>("uz")
    const [selectedVoice, setSelectedVoice] = useState<string>("")
    const [text, setText] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [speechRate, setSpeechRate] = useState([1])
    const [pitch, setPitch] = useState([1])
    const [volume, setVolume] = useState([0.8])

    const audioRef = useRef<HTMLAudioElement | null>(null)

    // Voice options for different languages
    const voices: Voice[] = [
        // Uzbek voices
        {
            id: "dildora",
            name: "Dildora",
            language: "uz",
            gender: "female",
            description: "Warm and friendly Uzbek voice",
            avatar: "👩‍🦰"
        },
        {
            id: "elmira",
            name: "Elmira",
            language: "uz",
            gender: "female",
            description: "Clear and professional Uzbek voice",
            avatar: "👩‍💼"
        },
        {
            id: "aziza",
            name: "Aziza",
            language: "uz",
            gender: "female",
            description: "Young and energetic Uzbek voice",
            avatar: "👩‍🎓"
        },
        {
            id: "marhabo",
            name: "Marhabo",
            language: "uz",
            gender: "female",
            description: "Mature and wise Uzbek voice",
            avatar: "👩‍🦳"
        },
        {
            id: "rustam",
            name: "Rustam",
            language: "uz",
            gender: "male",
            description: "Strong and confident Uzbek voice",
            avatar: "👨‍💼"
        },
        {
            id: "jamshid",
            name: "Jamshid",
            language: "uz",
            gender: "male",
            description: "Friendly and approachable Uzbek voice",
            avatar: "👨‍🦱"
        },
        {
            id: "umar",
            name: "Umar",
            language: "uz",
            gender: "male",
            description: "Young and dynamic Uzbek voice",
            avatar: "👨‍🎓"
        },
        {
            id: "abdullah",
            name: "Abdullah",
            language: "uz",
            gender: "male",
            description: "Traditional and respectful Uzbek voice",
            avatar: "👨‍🦳"
        },
        // Karakalpak voices
        {
            id: "araylim",
            name: "Araylim",
            language: "kaa",
            gender: "female",
            description: "Melodic Karakalpak voice",
            avatar: "👩‍🦰"
        },
        {
            id: "sevinch",
            name: "Sevinch",
            language: "kaa",
            gender: "female",
            description: "Clear Karakalpak voice",
            avatar: "👩‍💼"
        },
        // English voices
        {
            id: "sarah",
            name: "Sarah",
            language: "en",
            gender: "female",
            description: "Clear American English voice",
            avatar: "👩‍🦰"
        },
        {
            id: "emma",
            name: "Emma",
            language: "en",
            gender: "female",
            description: "Warm British English voice",
            avatar: "👩‍💼"
        },
        {
            id: "michael",
            name: "Michael",
            language: "en",
            gender: "male",
            description: "Professional American English voice",
            avatar: "👨‍💼"
        },
        {
            id: "james",
            name: "James",
            language: "en",
            gender: "male",
            description: "Friendly British English voice",
            avatar: "👨‍🦱"
        }
    ]

    // Filter voices by selected language
    const availableVoices = voices.filter(voice => voice.language === selectedLanguage)

    // Set default voice when language changes or available voices change
    useEffect(() => {
        if (!availableVoices.some(v => v.id === selectedVoice)) {
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0].id)
            }
        }
    }, [selectedLanguage, availableVoices, selectedVoice])

    // Get selected voice object
    const selectedVoiceObj = voices.find(voice => voice.id === selectedVoice)

    // Get language display name
    const getLanguageName = (lang: Language) => {
        switch (lang) {
            case "uz": return "O'zbekcha"
            case "en": return "English"
            case "kaa": return "Qoraqalpoqcha"
            default: return "O'zbekcha"
        }
    }

    // Generate speech
    const generateSpeech = async () => {
        if (!text.trim() || !selectedVoice) {
            setError("Please enter text and select a voice")
            return
        }

        setIsGenerating(true)
        setError(null)

        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text.trim(),
                    voice: selectedVoice,
                    language: selectedLanguage,
                    speechRate: speechRate[0],
                    pitch: pitch[0],
                    volume: volume[0]
                }),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const audioBlob = await response.blob()
            const audioUrl = URL.createObjectURL(audioBlob)

            setAudioBlob(audioBlob)
            setAudioUrl(audioUrl)
            setIsGenerating(false)

        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate speech")
            setIsGenerating(false)
        }
    }

    // Play audio
    const playAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                audioRef.current.play()
                setIsPlaying(true)
            }
        }
    }

    // Stop audio
    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            setIsPlaying(false)
        }
    }

    // Download audio
    const downloadAudio = () => {
        if (audioBlob) {
            const url = URL.createObjectURL(audioBlob)
            const a = document.createElement('a')
            a.href = url
            a.download = `tts-${selectedVoice}-${Date.now()}.mp3`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }
    }

    // Copy text
    const copyText = async () => {
        if (text) {
            try {
                await navigator.clipboard.writeText(text)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                setError("Failed to copy to clipboard")
            }
        }
    }

    // Handle audio ended
    const handleAudioEnded = () => {
        setIsPlaying(false)
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-4">
                        Text-to-Speech
                    </h1>
                    <p className="text-lg text-foreground/70">
                        Convert your text into natural-sounding speech with multiple voices
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Text Input & Controls */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Language & Voice Selection */}
                        <Card className="p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 shadow-xl">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Globe className="h-5 w-5 text-foreground/60" />
                                    <span className="text-sm font-medium text-foreground/80">Language & Voice Selection</span>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* Language Selection */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground/70">Language</label>
                                        <Select value={selectedLanguage} onValueChange={(value: Language) => setSelectedLanguage(value)}>
                                            <SelectTrigger className="bg-background/50 border-white/10">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="uz">O'zbekcha</SelectItem>
                                                <SelectItem value="kaa">Qoraqalpoqcha</SelectItem>
                                                <SelectItem value="en">English</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Voice Selection */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground/70">Voice</label>
                                        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                                            <SelectTrigger className="bg-background/50 border-white/10">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableVoices.map((voice) => (
                                                    <SelectItem key={voice.id} value={voice.id}>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg">{voice.avatar}</span>
                                                            <div>
                                                                <div className="font-medium">{voice.name}</div>
                                                                <div className="text-xs text-foreground/60">{voice.description}</div>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Selected Voice Preview */}
                                {selectedVoiceObj && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-background/30 rounded-lg p-4 border border-white/5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl">{selectedVoiceObj.avatar}</div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{selectedVoiceObj.name}</h3>
                                                <p className="text-sm text-foreground/60">{selectedVoiceObj.description}</p>
                                                <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                                    {selectedVoiceObj.gender === 'female' ? 'Female' : 'Male'}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </Card>

                        {/* Text Input */}
                        <Card className="p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 shadow-xl">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-foreground/70">Text to Convert</label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={copyText}
                                        className="rounded-full"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>

                                <Textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={`Enter your text in ${getLanguageName(selectedLanguage)}...`}
                                    className="min-h-[200px] bg-background/50 border-white/10 resize-none"
                                    maxLength={1000}
                                />

                                <div className="flex justify-between text-sm text-foreground/60">
                                    <span>{text.length}/1000 characters</span>
                                    <span>{getLanguageName(selectedLanguage)}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Voice Settings */}
                        <Card className="p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 shadow-xl">
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-foreground/60" />
                                    <span className="text-sm font-medium text-foreground/80">Voice Settings</span>
                                </div>

                                <div className="grid sm:grid-cols-3 gap-6">
                                    {/* Speech Rate */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-foreground/70">Speech Rate</label>
                                        <Slider
                                            value={speechRate}
                                            onValueChange={setSpeechRate}
                                            max={2}
                                            min={0.5}
                                            step={0.1}
                                            className="w-full"
                                        />
                                        <span className="text-xs text-foreground/60">{speechRate[0]}x</span>
                                    </div>

                                    {/* Pitch */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-foreground/70">Pitch</label>
                                        <Slider
                                            value={pitch}
                                            onValueChange={setPitch}
                                            max={2}
                                            min={0.5}
                                            step={0.1}
                                            className="w-full"
                                        />
                                        <span className="text-xs text-foreground/60">{pitch[0]}x</span>
                                    </div>

                                    {/* Volume */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-foreground/70">Volume</label>
                                        <Slider
                                            value={volume}
                                            onValueChange={setVolume}
                                            max={1}
                                            min={0}
                                            step={0.1}
                                            className="w-full"
                                        />
                                        <span className="text-xs text-foreground/60">{Math.round(volume[0] * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Generate Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                onClick={generateSpeech}
                                disabled={isGenerating || !text.trim()}
                                className="w-full py-6 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 rounded-xl text-lg font-semibold shadow-lg"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                                        Generating Speech...
                                    </>
                                ) : (
                                    <>
                                        <Volume2 className="h-5 w-5 mr-3" />
                                        Generate Speech
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column - Audio Player */}
                    <div className="space-y-6">
                        {/* Audio Player */}
                        <AnimatePresence>
                            {audioUrl && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <Card className="p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 shadow-xl">
                                        <div className="space-y-6">
                                            <div className="text-center">
                                                <h3 className="text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-2">
                                                    Generated Audio
                                                </h3>
                                                <p className="text-sm text-foreground/60">
                                                    Listen to your text-to-speech output
                                                </p>
                                            </div>

                                            {/* Audio Controls */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-center gap-4">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="rounded-full w-12 h-12 p-0"
                                                        onClick={stopAudio}
                                                    >
                                                        <Square className="h-4 w-4" />
                                                    </Button>

                                                    <motion.button
                                                        onClick={playAudio}
                                                        className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 flex items-center justify-center shadow-lg"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {isPlaying ? (
                                                            <Square className="h-6 w-6 text-white" />
                                                        ) : (
                                                            <Play className="h-6 w-6 text-white ml-1" />
                                                        )}
                                                    </motion.button>
                                                </div>

                                                {/* Hidden Audio Element */}
                                                <audio
                                                    ref={audioRef}
                                                    src={audioUrl}
                                                    onEnded={handleAudioEnded}
                                                    onPlay={() => setIsPlaying(true)}
                                                    onPause={() => setIsPlaying(false)}
                                                />

                                                {/* Download Button */}
                                                <Button
                                                    onClick={downloadAudio}
                                                    variant="outline"
                                                    className="w-full rounded-xl"
                                                >
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download Audio
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Voice Gallery */}
                        <Card className="p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 shadow-xl">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-center">Available Voices</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {availableVoices.map((voice) => (
                                        <motion.div
                                            key={voice.id}
                                            className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedVoice === voice.id
                                                ? 'bg-primary/10 border-primary/30'
                                                : 'bg-background/30 border-white/5 hover:bg-background/50'
                                                }`}
                                            onClick={() => setSelectedVoice(voice.id)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="text-center">
                                                <div className="text-2xl mb-1">{voice.avatar}</div>
                                                <div className="text-sm font-medium">{voice.name}</div>
                                                <div className="text-xs text-foreground/60">{voice.gender}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Error Display */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
} 