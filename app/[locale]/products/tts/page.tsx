import { useTranslations } from "next-intl"
import { Volume2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TTSPage() {
    const t = useTranslations()

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 mb-8 shadow-lg">
                        <Volume2 className="h-10 w-10 text-white" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent mb-6">
                        TTS - Text-to-Speech
                    </h1>

                    <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                        Natural-sounding text-to-speech technology for the Uzbek language.
                        Convert written Uzbek text into clear, natural speech with multiple voice options.
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">Coming Soon</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                            <ul className="space-y-2 text-foreground/70">
                                <li>• Natural-sounding Uzbek voices</li>
                                <li>• Multiple voice options</li>
                                <li>• Adjustable speech rate</li>
                                <li>• Emotion and tone control</li>
                                <li>• High-quality audio output</li>
                            </ul>
                        </div>

                        <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
                            <ul className="space-y-2 text-foreground/70">
                                <li>• Audiobook creation</li>
                                <li>• Accessibility tools</li>
                                <li>• Educational content</li>
                                <li>• Navigation systems</li>
                                <li>• Content narration</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 rounded-full px-8"
                            disabled
                        >
                            Get Notified
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8"
                            asChild
                        >
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 