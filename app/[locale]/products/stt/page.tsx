import { useTranslations } from "next-intl"
import { Mic } from "lucide-react"
import STT from "@/components/STT"

export default function STTPage() {
    const t = useTranslations()

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 mb-8 shadow-lg">
                        <Mic className="h-10 w-10 text-white" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-6">
                        STT - Speech-to-Text
                    </h1>

                    <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                        Advanced speech-to-text technology specifically designed for the Uzbek language.
                        Convert spoken Uzbek words into accurate text with high precision.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                            <ul className="space-y-2 text-foreground/70">
                                <li>• High-accuracy Uzbek speech recognition</li>
                                <li>• Real-time transcription</li>
                                <li>• Support for various Uzbek dialects</li>
                                <li>• Noise cancellation technology</li>
                                <li>• Custom vocabulary training</li>
                            </ul>
                        </div>

                        <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
                            <ul className="space-y-2 text-foreground/70">
                                <li>• Meeting transcriptions</li>
                                <li>• Voice notes and dictation</li>
                                <li>• Accessibility applications</li>
                                <li>• Content creation</li>
                                <li>• Educational tools</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* STT Component */}
                <STT />
            </div>
        </div>
    )
} 