"use client"

import { useTranslations } from "next-intl"
import { Brain, Info, CheckCircle, UploadCloud, Video, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useState } from "react"
import Image from "next/image"

export default function UzSumLMPage() {
    const t = useTranslations()
    const summary = useSelector((state: any) => state.summary.value)
    const [image, setImage] = useState<File | null>(null)
    const [videoUrl, setVideoUrl] = useState<string>("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [customSummary, setCustomSummary] = useState("")

    const defaultImage = "/v2.jpg"
    const demoVideo = "/v2--dill.mp4"
    const concatVideo = "/v2--dill_concat.mp4"

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleGenerateVideo = () => {
        setIsProcessing(true)
        setVideoUrl("")
        setTimeout(() => {
            setIsProcessing(false)
            setVideoUrl(concatVideo)
        }, 3000) // Simulate 3 seconds processing
    }

    const imagePreview = image
        ? URL.createObjectURL(image)
        : defaultImage

    // Responsive card style
    const cardClass = "bg-white/80 dark:bg-background/80 rounded-2xl shadow-lg border border-border p-4 sm:p-6 flex flex-col items-center w-full"

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 px-2 sm:px-4 md:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-20">
            <div className="max-w-3xl mx-auto px-0 sm:px-4 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-violet-400 mb-4 sm:mb-6 shadow-lg">
                        <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent mb-2 sm:mb-3">
                        UzSumLM
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-2">
                        The next-generation Uzbek Summarization Language Model: <span className="font-semibold">text-to-summary, image-to-video, and more</span>.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-medium">
                            <Sparkles className="h-4 w-4" /> AI-powered
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-medium">
                            <Video className="h-4 w-4" /> Video Synthesis
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium">
                            <UploadCloud className="h-4 w-4" /> Image-to-Video
                        </span>
                    </div>
                </div>

                {/* Step-by-step Demo */}
                <div className="space-y-8 sm:space-y-10 mb-10 sm:mb-12">
                    {/* Step 1: Summary Input/Preview */}
                    <div className={cardClass}>
                        <div className="flex items-center gap-2 mb-2 w-full">
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                            <span className="font-semibold">Step 1: Enter or use a summary</span>
                            <Info className="h-4 w-4 text-muted-foreground ml-1" aria-label="You can use your own summary or the one generated on the main page." />
                        </div>
                        <textarea
                            className="w-full max-w-full min-h-[120px] sm:min-h-[150px] rounded-lg border border-border px-3 py-2 text-sm mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                            placeholder="Paste or write your summary here..."
                            value={customSummary || summary}
                            onChange={e => setCustomSummary(e.target.value)}
                        />
                        <div className="text-xs text-muted-foreground">This summary will be used for the video demo below.</div>
                    </div>

                    {/* Step 2: Image Upload/Preview */}
                    <div className={cardClass + " flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8"}>
                        <div className="flex items-center gap-2 mb-2 w-full sm:w-auto">
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                            <span className="font-semibold">Step 2: Upload or select an image</span>
                            <Info className="h-4 w-4 text-muted-foreground ml-1" aria-label="Your image will be used as the face in the generated video." />
                        </div>
                        <div className="flex flex-col items-center w-full sm:w-auto">
                            <Image src={imagePreview} alt="Preview" width={140} height={140} className="rounded-xl border shadow object-cover w-32 h-32 sm:w-40 sm:h-40" />
                            <input type="file" accept="image/*" onChange={handleImageChange} className="block mt-2 w-full text-xs" />
                            <div className="text-xs text-muted-foreground mt-1 text-center">Default image is used if none uploaded.</div>
                        </div>
                    </div>

                    {/* Step 3: Generate Video */}
                    <div className={cardClass}>
                        <div className="flex items-center gap-2 mb-2 w-full">
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                            <span className="font-semibold">Step 3: Generate and preview video</span>
                            <Info className="h-4 w-4 text-muted-foreground ml-1" aria-label="This is a demo. The video is a sample, but your image is shown as the poster." />
                        </div>
                        <Button className="mt-2 mb-4 w-full sm:w-auto" onClick={handleGenerateVideo} disabled={isProcessing}>
                            {isProcessing ? "Processing..." : "Generate Video Summary"}
                        </Button>
                        {isProcessing && <div className="text-primary mt-2 animate-pulse">Generating video, please wait...</div>}
                        {demoVideo && (
                            <div className="mt-4 w-full flex flex-col items-center">
                                <video
                                    controls
                                    width={320}
                                    height={180}
                                    src={demoVideo}
                                    poster={imagePreview}
                                    className="rounded-xl shadow-lg border w-full max-w-xs sm:max-w-md md:max-w-lg"
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="text-xs text-muted-foreground mt-1 text-center">Demo video for your summary text and image</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modern Feature & Use Case Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
                    <div className={cardClass}>
                        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Key Features</h3>
                        <ul className="space-y-2 text-foreground/80 text-sm text-left w-full">
                            <li>• Uzbek-specific language model</li>
                            <li>• Context-aware summarization</li>
                            <li>• Multiple summary lengths</li>
                            <li>• High accuracy and fluency</li>
                            <li>• Image-to-video synthesis</li>
                            <li>• Audio/video preview</li>
                            <li>• Continuous learning capabilities</li>
                        </ul>
                    </div>
                    <div className={cardClass}>
                        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Use Cases</h3>
                        <ul className="space-y-2 text-foreground/80 text-sm text-left w-full">
                            <li>• Document summarization</li>
                            <li>• News article summaries</li>
                            <li>• Research paper abstracts</li>
                            <li>• Content curation</li>
                            <li>• Educational materials</li>
                            <li>• Personalized video content</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}