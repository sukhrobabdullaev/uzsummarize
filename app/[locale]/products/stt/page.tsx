import { useTranslations } from "next-intl"
import { Mic } from "lucide-react"
import STT from "@/components/STT"

export default function STTPage() {
    const t = useTranslations()

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 pt-16 sm:pt-20">
            <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 mb-6 sm:mb-8 shadow-lg">
                        <Mic className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                        STT - Speech-to-Text
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto">
                        Advanced speech-to-text technology specifically designed for the Uzbek language.
                        Convert spoken Uzbek words into accurate text with high precision.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                        <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Key Features</h3>
                            <ul className="space-y-1 sm:space-y-2 text-foreground/70 text-sm sm:text-base">
                                <li>• High-accuracy Uzbek speech recognition</li>
                                <li>• Real-time transcription</li>
                                <li>• Support for various Uzbek dialects</li>
                                <li>• Noise cancellation technology</li>
                                <li>• Custom vocabulary training</li>
                            </ul>
                        </div>

                        <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/5">
                            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Use Cases</h3>
                            <ul className="space-y-1 sm:space-y-2 text-foreground/70 text-sm sm:text-base">
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