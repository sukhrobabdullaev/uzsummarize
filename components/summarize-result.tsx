"use client"

import { useState, useEffect } from "react"
import { Check, Copy, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { convertUzbekLatinToCyrillic } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SummaryResultProps {
  summary: string
}

const SummaryResult = ({ summary }: SummaryResultProps) => {
  const [copied, setCopied] = useState(false)
  const [scriptMode, setScriptMode] = useState<"latin" | "cyrillic">("latin")
  const t = useTranslations()

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 2000)
    }
    return () => clearTimeout(timeout)
  }, [copied])

  const handleCopy = async () => {
    try {
      const textToCopy = scriptMode === "cyrillic" ? convertUzbekLatinToCyrillic(summary) : summary
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      toast.success(t("summaryResult.copySuccess"), {
        duration: 2000,
        className: "modern-toast",
      })
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      toast.error(t("summaryResult.copyError"))
    }
  }

  const displayText = scriptMode === "cyrillic" ? convertUzbekLatinToCyrillic(summary) : summary

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t("summaryResult.title")}
          </h3>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div
            className="relative flex h-9 w-[120px] items-center rounded-full bg-secondary/20 p-1 shadow-inner backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute z-0 h-7 w-[56px] rounded-full bg-gradient-to-r from-primary/90 to-primary/70 shadow-sm"
              animate={{ x: scriptMode === "latin" ? 2 : 60 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
            <motion.button
              onClick={() => setScriptMode("latin")}
              className={`relative z-10 flex h-7 w-[56px] items-center justify-center rounded-full text-sm font-medium transition-colors ${
                scriptMode === "latin" ? "text-white" : "text-muted-foreground"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span animate={{ opacity: scriptMode === "latin" ? 1 : 0.7 }} transition={{ duration: 0.2 }}>
                Lotin
              </motion.span>
            </motion.button>
            <motion.button
              onClick={() => setScriptMode("cyrillic")}
              className={`relative z-10 flex h-7 w-[56px] items-center justify-center rounded-full text-sm font-medium transition-colors ${
                scriptMode === "cyrillic" ? "text-white" : "text-muted-foreground"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span animate={{ opacity: scriptMode === "cyrillic" ? 1 : 0.7 }} transition={{ duration: 0.2 }}>
                Кирил
              </motion.span>
            </motion.button>
          </motion.div>

          <motion.button
            onClick={handleCopy}
            className="p-2.5 rounded-full hover:bg-secondary/30 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Copy to clipboard"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Check className="h-5 w-5 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0, rotate: 10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Copy className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <motion.div
        className="relative overflow-hidden bg-background border border-border rounded-xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06)" }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
        <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">{displayText}</p>
      </motion.div>
    </motion.div>
  )
}

export default SummaryResult
