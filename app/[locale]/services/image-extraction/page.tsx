"use client"

import { ImageExtraction } from "@/components/ImageExtraction"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function ImageExtractionPage() {
  const t = useTranslations("imageExtraction")

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 pt-20 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <motion.div
          className="mt-3 w-12 h-1 bg-primary/20 mx-auto rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ImageExtraction />
      </motion.div>
    </motion.div>
  )
}
