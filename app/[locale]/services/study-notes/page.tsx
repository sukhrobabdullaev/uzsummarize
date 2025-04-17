"use client"

import { useTranslations } from "next-intl"
import { StudyNotes } from "@/components/study/study-notes"
import { motion } from "framer-motion"

export default function StudyNotesPage() {
    const t = useTranslations("services.studyNotes")

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pb-20 md:pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-6 sm:mb-8"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
                    {t("title")}
                </h1>
                <motion.div
                    className="mt-2 sm:mt-3 w-8 sm:w-12 h-1 bg-primary/20 mx-auto rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full"
            >
                <StudyNotes />
            </motion.div>
        </motion.div>
    )
}