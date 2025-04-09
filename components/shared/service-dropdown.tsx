"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, FileText, ImageIcon, FileSearch, BookOpen, Lightbulb, Clock } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

export function ServicesDropdown({ isMobile = false }: { isMobile?: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeService, setActiveService] = useState<string | null>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const t = useTranslations()
    const locale = useLocale()

    const services = useMemo(() => [
        {
            name: t("services.imageTextExtraction.name"),
            description: t("services.imageTextExtraction.description"),
            icon: ImageIcon,
            path: `/${locale}/services/image-extraction`,
            color: "from-blue-500 to-cyan-400",
        },
        {
            name: t("services.imageDescription.name"),
            description: t("services.imageDescription.description"),
            icon: FileText,
            path: `/${locale}/services/image-description`,
            color: "from-violet-500 to-purple-400",
        },
        {
            name: t("services.pdfSummarization.name"),
            description: t("services.pdfSummarization.description"),
            icon: FileSearch,
            path: `/${locale}/services/pdf-summarization`,
            color: "from-rose-500 to-pink-400",
            comingSoon: true
        },
        {
            name: t("services.studyNotes.name"),
            description: t("services.studyNotes.description"),
            icon: BookOpen,
            path: `/${locale}/services/study-notes`,
            color: "from-emerald-500 to-green-400",
            comingSoon: true
        },
        {
            name: t("services.conceptExplanation.name"),
            description: t("services.conceptExplanation.description"),
            icon: Lightbulb,
            path: `/${locale}/services/concept-explanation`,
            color: "from-amber-500 to-yellow-400",
            comingSoon: true
        },
    ], [locale, t])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        const path = window.location.pathname
        const currentService = services.find(service => path.startsWith(service.path))
        setActiveService(currentService?.path || null)
    }, [services])

    if (isMobile) {
        return (
            <div className="space-y-2">
                <div
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/50 transition-all duration-200 group border border-transparent hover:border-white/5"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="text-lg font-medium whitespace-nowrap">{t("navigation.services")}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-8 w-8 flex-shrink-0 rounded-full bg-background/80 flex items-center justify-center border border-white/5 shadow-sm group-hover:bg-primary/10 ml-2"
                    >
                        <ChevronDown className="h-4 w-4 text-primary group-hover:text-primary/80" />
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pl-4"
                        >
                            <div className="space-y-1 border-l-2 border-primary/20 pl-4 py-2">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={service.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.2 }}
                                    >
                                        <Link
                                            href={service.path}
                                            className={`flex items-start p-3 rounded-lg transition-all duration-200 group ${service.comingSoon
                                                ? 'opacity-60 cursor-not-allowed'
                                                : 'hover:bg-accent/30'
                                                }`}
                                            onClick={(e) => {
                                                if (service.comingSoon) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <div
                                                className={`h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mr-3 shadow-sm`}
                                            >
                                                <service.icon className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium flex items-center gap-2 flex-wrap">
                                                    <span className="break-words">{service.name}</span>
                                                    {service.comingSoon && (
                                                        <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                                                            <Clock className="w-4 h-4" />
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-foreground/60 break-words">{service.description}</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className="relative px-4 py-1.5 text-foreground/80 hover:text-foreground transition-all duration-200 text-sm rounded-full hover:bg-background/70 group whitespace-nowrap"
            >
                <span className="relative z-10 flex items-center gap-1">
                    {t("navigation.services")}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </span>
                {activeService && (
                    <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-background/80 rounded-full shadow-sm border border-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:w-1/2" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-[280px] sm:w-[320px] max-w-[95vw] rounded-xl bg-background/95 backdrop-blur-xl border border-white/5 shadow-lg overflow-hidden"
                    >
                        <div className="p-2 space-y-1">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.path}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.2 }}
                                >
                                    <Link
                                        href={service.path}
                                        className={`flex items-start p-3 rounded-lg transition-all duration-200 group ${service.comingSoon
                                            ? 'opacity-60 cursor-not-allowed'
                                            : 'hover:bg-accent/30'
                                            }`}
                                        onClick={(e) => {
                                            if (service.comingSoon) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        <div
                                            className={`h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mr-3 shadow-sm`}
                                        >
                                            <service.icon className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium flex items-center gap-2 flex-wrap">
                                                <span className="break-words">{service.name}</span>
                                                {service.comingSoon && (
                                                    <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                                                        <Clock className="w-4 h-4" />
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-xs text-foreground/60 break-words">{service.description}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
