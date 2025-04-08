"use client"

import { useRef, useState, useEffect } from "react"
import { ArrowDown, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typewriter } from "react-simple-typewriter"
import { useTranslations } from "next-intl"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

const Hero = () => {
  const t = useTranslations()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [isHovering, setIsHovering] = useState(false)

  // Scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 100])

  const scrollToForm = () => {
    const form = document.getElementById("summarizer-form")
    const navHeight = 10 // Approximate navbar height
    if (form) {
      const formPosition = form.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({
        top: formPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale, y }}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-[85rem] w-full mx-auto text-center space-y-6 sm:space-y-8 z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2 bg-accent/50 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-foreground/90 mx-auto w-fit border border-white/10 shadow-lg">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary animate-pulse" />
            <span>{t("hero.tagline")}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl md:leading-15"
        >
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            {t("hero.title", { type: t("hero.typewriter.text") })}{" "}
          </span>
          <span className="inline relative">
            <span className="relative z-10 text-primary">
              <Typewriter
                words={[t("hero.typewriter.text"), t("hero.typewriter.image"), t("hero.typewriter.pdf")]}
                loop={0}
                cursor
                typeSpeed={500}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
            <motion.span
              className="absolute -inset-1 bg-primary/10 rounded-lg -z-10 blur-sm"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </span>
          <br className="hidden sm:block" />
          <span className="block sm:inline bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            {t("hero.summarization")}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] mx-auto mt-2"
        >
          <motion.svg
            className="w-full h-2 sm:h-3 text-primary/30"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.path
              d="M0,0 Q50,12 100,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-base sm:text-lg text-foreground/80 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 backdrop-blur-sm py-2 rounded-lg"
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            className="w-full sm:w-auto relative"
          >
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/60 to-violet-500/60 rounded-full blur-md -z-10"
                />
              )}
            </AnimatePresence>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/70 rounded-full px-6 sm:px-8 py-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 group w-full sm:w-auto text-sm sm:text-base border border-white/10"
            >
              <span>{t("common.tryNow")}</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-6 sm:px-8 py-2.5 border-primary/20 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base backdrop-blur-md group"
            >
              <span>{t("common.learnMore")}</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="p-1.5 sm:p-2 rounded-full bg-background/70 backdrop-blur-md shadow-lg border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToForm}
        >
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </motion.div>
      </motion.div>

      <div id="summarizer-form" className="-mt-16 sm:-mt-20" />
    </motion.section>
  )
}

export default Hero
