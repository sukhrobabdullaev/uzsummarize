"use client"

import { useState } from "react"
import { Bug, ChevronDown, ChevronUp, Sparkles, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Changelog() {
    const t = useTranslations('changelog');
    const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({
        "1.0.0": false,
        "1.1.0": true,
    })

    const toggleVersion = (version: string) => {
        setExpandedVersions((prev) => ({
            ...prev,
            [version]: !prev[version],
        }))
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-24">
            <motion.div
                className="animate-fade-in"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent inline-block">
                        {t('title')}
                    </h1>
                    <div className="mt-3 sm:mt-4 w-12 sm:w-16 h-1 bg-primary/20 mx-auto rounded-full"></div>
                </motion.div>

                <motion.p
                    className="text-foreground/80 sm:text-lg text-sm my-5 max-w-full mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {t('description')}
                </motion.p>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* Version 1.1.0 */}
                    <motion.div
                        className="glass rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 cursor-pointer"
                            onClick={() => toggleVersion("1.1.0")}
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                                <h2 className="text-xl sm:text-2xl font-semibold">{t("version")} 1.1.0</h2>
                                <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 text-sm">
                                    {t('latest')}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4">
                                <span className="text-xs sm:text-sm text-foreground/60">April 17, 2024</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8">
                                    {expandedVersions["1.1.0"] ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
                                </Button>
                            </div>
                        </div>

                        {expandedVersions["1.1.0"] && (
                            <motion.div
                                className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                        <h3 className="font-medium text-base sm:text-lg">{t('newFeatures')}</h3>
                                    </div>
                                    <ul className="space-y-1.5 sm:space-y-2 pl-5 sm:pl-7 list-disc text-sm sm:text-base text-foreground/80">
                                        <li>Added GPT and Gemini models with critical analysis functionality</li>
                                        <li>Implemented URL summarizer for news, articles, and web pages</li>
                                        <li>Introduced study notes with 3 difficulty levels (beginner, medium, advanced)</li>
                                        <li>Added mindmap and flashcard features for enhanced learning</li>
                                        <li>Implemented copy-to-clipboard functionality for summary results</li>
                                    </ul>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                                        <h3 className="font-medium text-base sm:text-lg">{t('improvements')}</h3>
                                    </div>
                                    <ul className="space-y-1.5 sm:space-y-2 pl-5 sm:pl-7 list-disc text-sm sm:text-base text-foreground/80">
                                        <li>Optimized modern text summarization UI</li>
                                        <li>Enhanced URL summarization with multiple AI model support</li>
                                        <li>Updated footer with modern style and social links</li>
                                        <li>Improved response quality with AI-powered models</li>
                                        <li>Added structured mindmap and flashcard download options</li>
                                    </ul>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <Bug className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                                        <h3 className="font-medium text-base sm:text-lg">{t('bugFixes')}</h3>
                                    </div>
                                    <ul className="space-y-1.5 sm:space-y-2 pl-5 sm:pl-7 list-disc text-sm sm:text-base text-foreground/80">
                                        <li>Fixed rate limiting (2 requests per minute)</li>
                                        <li>Improved image extraction and description processing</li>
                                        <li>Integrated prompts and results with PostgreSQL database</li>
                                        <li>Updated request limits (2 requests per 6 hours)</li>
                                        <li>Fixed image size support up to 5MB</li>
                                    </ul>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Version 1.0.0 */}
                    <motion.div
                        className="glass rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 cursor-pointer"
                            onClick={() => toggleVersion("1.0.0")}
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
                                <h2 className="text-xl sm:text-2xl font-semibold">{t("version")} 1.0.0</h2>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4">
                                <span className="text-xs sm:text-sm text-foreground/60">April 8, 2024</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8">
                                    {expandedVersions["1.0.0"] ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
                                </Button>
                            </div>
                        </div>

                        {expandedVersions["1.0.0"] && (
                            <motion.div
                                className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                        <h3 className="font-medium text-base sm:text-lg">{t('newFeatures')}</h3>
                                    </div>
                                    <ul className="space-y-1.5 sm:space-y-2 pl-5 sm:pl-7 list-disc text-sm sm:text-base text-foreground/80">
                                        <li>Added multi-language support (Uzbek, English, Russian)</li>
                                        <li>Implemented language persistence across sessions</li>
                                        <li>Added voice assistant feature for text-to-speech and speech-to-text</li>
                                        <li>Implemented modern glass design UI components</li>
                                        <li>Added animated particle background</li>
                                    </ul>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                                        <h3 className="font-medium text-base sm:text-lg">{t('improvements')}</h3>
                                    </div>
                                    <ul className="space-y-1.5 sm:space-y-2 pl-5 sm:pl-7 list-disc text-sm sm:text-base text-foreground/80">
                                        <li>Enhanced UI/UX with responsive design</li>
                                        <li>Improved language switching mechanism</li>
                                        <li>Added smooth animations and transitions</li>
                                        <li>Implemented proper error handling and loading states</li>
                                    </ul>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <Bug className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                                        <h3 className="font-medium text-base sm:text-lg">{t('bugFixes')}</h3>
                                    </div>
                                    <ul className="space-y-1.5 sm:space-y-2 pl-5 sm:pl-7 list-disc text-sm sm:text-base text-foreground/80">
                                        <li>Fixed language detection and persistence issues</li>
                                        <li>Resolved mobile responsiveness bugs</li>
                                        <li>Fixed translation inconsistencies</li>
                                    </ul>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}
