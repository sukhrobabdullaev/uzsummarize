"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Mic, MicOff, Upload, Play, Square, Download, Copy, Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"

interface STTResult {
    text: string
    confidence?: number
    language?: string
}

type Language = "uz" | "en"

// --- Add waveform visualization ---
function Waveform({ isRecording }: { isRecording: boolean }) {
    // We'll use random values for demo; in production, use real audio data
    const [bars, setBars] = useState<number[]>(Array(32).fill(0.5))
    useEffect(() => {
        if (!isRecording) return
        const interval = setInterval(() => {
            setBars(Array(32).fill(0).map(() => 0.3 + Math.random() * 0.7))
        }, 80)
        return () => clearInterval(interval)
    }, [isRecording])
    return (
        <svg width="100%" height="32" viewBox="0 0 160 32" className="my-2">
            {bars.map((v, i) => (
                <rect
                    key={i}
                    x={i * 5}
                    y={32 - v * 32}
                    width={3}
                    height={v * 32}
                    rx={2}
                    fill={`url(#wave-gradient)`}
                />
            ))}
            <defs>
                <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default function STT() {
    const t = useTranslations()
    const [isRecording, setIsRecording] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [transcription, setTranscription] = useState<string>("")
    const [streamingText, setStreamingText] = useState<string>("")
    const [isStreaming, setIsStreaming] = useState(false)
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [recordingTime, setRecordingTime] = useState(0)
    const [selectedLanguage, setSelectedLanguage] = useState<Language>("uz")

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])
    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    // Cleanup function
    const cleanup = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            mediaRecorderRef.current = null
        }
        if (recordingIntervalRef.current) {
            clearInterval(recordingIntervalRef.current)
            recordingIntervalRef.current = null
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            abortControllerRef.current = null
        }
        audioChunksRef.current = []
    }, [])

    // Start recording
    const startRecording = async () => {
        try {
            setError(null)
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            })

            audioChunksRef.current = []

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                }
            }

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                setAudioBlob(blob)
                setAudioUrl(URL.createObjectURL(blob))
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorderRef.current.start()
            setIsRecording(true)
            setRecordingTime(0)

            // Start recording timer
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)

        } catch (err) {
            setError("Failed to access microphone. Please check permissions.")
            console.error("Recording error:", err)
        }
    }

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current)
                recordingIntervalRef.current = null
            }
        }
    }

    // Handle file upload
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.type.startsWith('audio/')) {
                setAudioBlob(file)
                setAudioUrl(URL.createObjectURL(file))
                setError(null)
            } else {
                setError("Please select an audio file")
            }
        }
    }

    // Process audio with streaming
    const processAudio = async () => {
        if (!audioBlob) return

        setIsProcessing(true)
        setIsStreaming(true)
        setStreamingText("")
        setError(null)
        setTranscription("")

        try {
            abortControllerRef.current = new AbortController()

            const formData = new FormData()
            formData.append('audio', audioBlob, 'recording.webm')
            formData.append('language', selectedLanguage)

            const response = await fetch('/api/stt', {
                method: 'POST',
                body: formData,
                signal: abortControllerRef.current.signal
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const reader = response.body?.getReader()
            if (!reader) throw new Error("No response body")

            const decoder = new TextDecoder()
            let buffer = ""

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                buffer += decoder.decode(value, { stream: true })
                const lines = buffer.split('\n')
                buffer = lines.pop() || ""

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6)
                        if (data === '[DONE]') {
                            setIsStreaming(false)
                            setTranscription(streamingText)
                            return
                        }
                        try {
                            const parsed = JSON.parse(data)
                            if (parsed.text) {
                                setStreamingText(prev => prev + parsed.text)
                            }
                        } catch (e) {
                            // Ignore parsing errors for partial data
                        }
                    }
                }
            }

        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                // Request was aborted, do nothing
                return
            }
            setError(err instanceof Error ? err.message : "Failed to process audio")
            console.error("STT error:", err)
        } finally {
            setIsProcessing(false)
            setIsStreaming(false)
            abortControllerRef.current = null
        }
    }

    // Copy transcription
    const copyTranscription = async () => {
        const textToCopy = transcription || streamingText
        if (textToCopy) {
            try {
                await navigator.clipboard.writeText(textToCopy)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                setError("Failed to copy to clipboard")
            }
        }
    }

    // Download transcription
    const downloadTranscription = () => {
        const textToDownload = transcription || streamingText
        if (textToDownload) {
            const blob = new Blob([textToDownload], { type: 'text/plain' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'transcription.txt'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }
    }

    // Format recording time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Get language display name
    const getLanguageName = (lang: Language) => {
        return lang === "uz" ? "O'zbekcha" : "English"
    }

    // Cleanup on unmount
    useEffect(() => {
        return cleanup
    }, [cleanup])

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                        Speech-to-Text
                    </h1>
                    <p className="text-lg text-foreground/70">
                        Convert your voice to text with high accuracy using AI
                    </p>
                </div>

                {/* Language Selection */}
                <Card className="p-6 bg-accent/20 backdrop-blur-sm border-white/10">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-foreground/60" />
                            <span className="text-sm font-medium text-foreground/80">Transcription Language:</span>
                            <Select value={selectedLanguage} onValueChange={(value: Language) => setSelectedLanguage(value)}>
                                <SelectTrigger className="w-40 bg-background/50 border-white/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="uz">O'zbekcha</SelectItem>
                                    <SelectItem value="en">English</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </Card>

                {/* Recording Section */}
                <Card className="p-8 bg-background/60 backdrop-blur-2xl border border-white/10 shadow-xl relative overflow-hidden">
                    {/* Animated background particles */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.8 }}
                        style={{ zIndex: 0 }}
                    >
                        <svg width="100%" height="100%" className="absolute inset-0">
                            <defs>
                                <radialGradient id="bg-grad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#00f0ff33" />
                                    <stop offset="100%" stopColor="#7c3aed00" />
                                </radialGradient>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#bg-grad)" />
                        </svg>
                    </motion.div>
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        {/* Glowing animated mic button */}
                        <motion.button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`rounded-full w-24 h-24 flex items-center justify-center shadow-lg transition-all border-4 border-white/10 ${isRecording
                                ? 'bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 animate-pulse'
                                : 'bg-gradient-to-br from-blue-500 to-cyan-400'
                                }`}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            animate={isRecording ? {
                                boxShadow: [
                                    '0 0 0 0 #00f0ff55',
                                    '0 0 0 12px #7c3aed33',
                                    '0 0 0 0 #00f0ff55',
                                ]
                            } : {}}
                        >
                            <motion.div
                                animate={isRecording ? { scale: [1, 1.15, 1], opacity: [1, 0.7, 1] } : { scale: 1, opacity: 1 }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                            >
                                {isRecording ? (
                                    <Square className="h-10 w-10 text-white" />
                                ) : (
                                    <Mic className="h-10 w-10 text-white" />
                                )}
                            </motion.div>
                        </motion.button>
                        {/* Timer & status */}
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-mono text-primary drop-shadow-lg">
                                {formatTime(recordingTime)}
                            </span>
                            {isRecording && (
                                <motion.span
                                    className="text-base text-cyan-400 font-semibold mt-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    Recording <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.2 }}>...</motion.span>
                                </motion.span>
                            )}
                        </div>
                        {/* Waveform visualization */}
                        {isRecording && <Waveform isRecording={isRecording} />}

                        {/* Upload button */}
                        <div className="relative">
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={isRecording || isProcessing}
                            />
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full"
                                disabled={isRecording || isProcessing}
                            >
                                <Upload className="h-5 w-5 mr-2" />
                                Upload Audio
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Audio Preview */}
                {audioUrl && !isRecording && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                    >
                        <Card className="p-8 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-white/10 shadow-2xl max-w-2xl w-full">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                                        Audio Preview
                                    </h3>
                                    <p className="text-sm text-foreground/60">
                                        Listen to your recorded audio before transcription
                                    </p>
                                </div>

                                {/* Modern Audio Player */}
                                <div className="bg-background/50 rounded-xl p-6 border border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">Recorded Audio</p>
                                                <p className="text-sm text-foreground/60">Duration: {formatTime(recordingTime)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                                {getLanguageName(selectedLanguage)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Custom Audio Controls */}
                                    <div className="space-y-4">
                                        {/* Progress Bar */}
                                        <div className="relative">
                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                <motion.div
                                                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "0%" }}
                                                    id="audio-progress"
                                                />
                                            </div>
                                        </div>

                                        {/* Control Buttons */}
                                        <div className="flex items-center justify-center gap-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-full w-10 h-10 p-0"
                                                onClick={() => {
                                                    const audio = document.getElementById('audio-player') as HTMLAudioElement;
                                                    if (audio) {
                                                        audio.currentTime = Math.max(0, audio.currentTime - 10);
                                                    }
                                                }}
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            </Button>

                                            <Button
                                                size="lg"
                                                className="rounded-full w-16 h-16 p-0 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-lg"
                                                onClick={() => {
                                                    const audio = document.getElementById('audio-player') as HTMLAudioElement;
                                                    if (audio) {
                                                        if (audio.paused) {
                                                            audio.play();
                                                        } else {
                                                            audio.pause();
                                                        }
                                                    }
                                                }}
                                            >
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" id="play-icon">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                                <svg className="w-8 h-8 text-white hidden" fill="currentColor" viewBox="0 0 24 24" id="pause-icon">
                                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                </svg>
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-full w-10 h-10 p-0"
                                                onClick={() => {
                                                    const audio = document.getElementById('audio-player') as HTMLAudioElement;
                                                    if (audio) {
                                                        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
                                                    }
                                                }}
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" transform="rotate(180 12 12)" />
                                                </svg>
                                            </Button>
                                        </div>

                                        {/* Time Display */}
                                        <div className="flex justify-between text-sm text-foreground/60">
                                            <span id="current-time">0:00</span>
                                            <span id="total-time">{formatTime(recordingTime)}</span>
                                        </div>
                                    </div>

                                    {/* Hidden Native Audio Element */}
                                    <audio
                                        id="audio-player"
                                        className="hidden"
                                        onLoadedMetadata={() => {
                                            const audio = document.getElementById('audio-player') as HTMLAudioElement;
                                            const totalTime = document.getElementById('total-time');
                                            if (audio && totalTime) {
                                                totalTime.textContent = formatTime(Math.floor(audio.duration));
                                            }
                                        }}
                                        onTimeUpdate={() => {
                                            const audio = document.getElementById('audio-player') as HTMLAudioElement;
                                            const progress = document.getElementById('audio-progress') as HTMLElement;
                                            const currentTime = document.getElementById('current-time');
                                            if (audio && progress && currentTime) {
                                                const percentage = (audio.currentTime / audio.duration) * 100;
                                                progress.style.width = `${percentage}%`;
                                                currentTime.textContent = formatTime(Math.floor(audio.currentTime));
                                            }
                                        }}
                                        onPlay={() => {
                                            const playIcon = document.getElementById('play-icon');
                                            const pauseIcon = document.getElementById('pause-icon');
                                            if (playIcon && pauseIcon) {
                                                playIcon.classList.add('hidden');
                                                pauseIcon.classList.remove('hidden');
                                            }
                                        }}
                                        onPause={() => {
                                            const playIcon = document.getElementById('play-icon');
                                            const pauseIcon = document.getElementById('pause-icon');
                                            if (playIcon && pauseIcon) {
                                                playIcon.classList.remove('hidden');
                                                pauseIcon.classList.add('hidden');
                                            }
                                        }}
                                        onEnded={() => {
                                            const playIcon = document.getElementById('play-icon');
                                            const pauseIcon = document.getElementById('pause-icon');
                                            if (playIcon && pauseIcon) {
                                                playIcon.classList.remove('hidden');
                                                pauseIcon.classList.add('hidden');
                                            }
                                        }}
                                    >
                                        <source src={audioUrl} type="audio/webm" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex justify-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => {
                                            const audio = document.getElementById('audio-player') as HTMLAudioElement;
                                            if (audio) {
                                                audio.currentTime = 0;
                                                audio.play();
                                            }
                                        }}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                        Restart
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => {
                                            const audio = document.getElementById('audio-player') as HTMLAudioElement;
                                            if (audio) {
                                                audio.playbackRate = audio.playbackRate === 1 ? 1.5 : 1;
                                            }
                                        }}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13 6.99h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1zm0 3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1zm0 3h3c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1z" />
                                        </svg>
                                        Speed
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* Process Button */}
                {audioBlob && !isRecording && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                    >
                        <Button
                            onClick={processAudio}
                            disabled={isProcessing}
                            className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 rounded-full px-8 py-4 text-lg font-semibold shadow-lg"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Play className="h-5 w-5 mr-3" />
                                    Transcribe Audio ({getLanguageName(selectedLanguage)})
                                </>
                            )}
                        </Button>
                    </motion.div>
                )}

                {/* Processing Progress */}
                {isProcessing && (
                    <Card className="p-6 bg-accent/20 backdrop-blur-sm border-white/10">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Processing audio...</span>
                                {isStreaming && (
                                    <span className="text-xs text-primary animate-pulse">Streaming</span>
                                )}
                            </div>
                            <Progress value={isStreaming ? 50 : 100} className="h-2" />
                        </div>
                    </Card>
                )}

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

                {/* Transcription Result */}
                <AnimatePresence>
                    {(streamingText || transcription) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <Card className="p-6 bg-accent/20 backdrop-blur-sm border-white/10">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-semibold">Transcription</h3>
                                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                                {getLanguageName(selectedLanguage)}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={copyTranscription}
                                                className="rounded-full"
                                            >
                                                {copied ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={downloadTranscription}
                                                className="rounded-full"
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="bg-background/50 rounded-lg p-4 border border-white/5">
                                        <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                                            {streamingText || transcription}
                                            {isStreaming && (
                                                <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
} 