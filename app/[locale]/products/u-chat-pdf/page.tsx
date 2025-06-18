import { useTranslations } from "next-intl"
import { MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UChatPDFPage() {
    const t = useTranslations()

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-400 mb-8 shadow-lg">
                        <MessageSquare className="h-10 w-10 text-white" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-400 bg-clip-text text-transparent mb-6">
                        U-chat-pdf - Uzbek Chat with PDF
                    </h1>

                    <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                        Interactive chat interface for PDF documents in Uzbek language.
                        Ask questions about your PDF content and get intelligent responses.
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">Coming Soon</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                            <ul className="space-y-2 text-foreground/70">
                                <li>• Interactive PDF chat interface</li>
                                <li>• Uzbek language support</li>
                                <li>• Context-aware responses</li>
                                <li>• Document understanding</li>
                                <li>• Multi-page document support</li>
                            </ul>
                        </div>

                        <div className="bg-accent/30 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold mb-3">Use Cases</h3>
                            <ul className="space-y-2 text-foreground/70">
                                <li>• Document Q&A</li>
                                <li>• Research assistance</li>
                                <li>• Educational support</li>
                                <li>• Legal document analysis</li>
                                <li>• Technical documentation</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-400 hover:from-orange-600 hover:to-red-500 rounded-full px-8"
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