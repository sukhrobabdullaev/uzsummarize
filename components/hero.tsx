"use client"

import { useRef, useState, useEffect } from "react"
import { ArrowDown, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typewriter } from "react-simple-typewriter"
import { useTranslations } from "next-intl"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

const Hero = () => {
  const t = useTranslations()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 100])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Magic dots configuration
  const dots = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 3,
  }))

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
      className="relative min-h-[100dvh] flex flex-col-reverse items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 overflow-hidden"
    >
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5" />

      {/* Interactive cursor glow */}
      <motion.div
        className="absolute pointer-events-none rounded-full bg-gradient-to-r from-primary/20 to-violet-500/20 blur-2xl"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          width: 300,
          height: 300,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Geometric background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl hidden lg:block"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-tl from-violet-500/10 to-transparent rounded-full blur-2xl hidden lg:block"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-[95rem] w-full mx-auto flex flex-col-reverse xl:grid xl:flex-none xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center z-10 px-2 sm:px-4"
      >
        {/* Left side - Text content */}
        <div className="text-center xl:text-left space-y-4 sm:space-y-6 order-2 xl:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-violet-500/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-foreground/90 w-fit border border-primary/20 shadow-lg mx-auto xl:mx-0">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent font-semibold">
                {t("hero.tagline")}
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
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
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-lg -z-10 blur-sm"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </span>
            <br />
            <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              {t("hero.summarization")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-xl mx-auto xl:mx-0"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center xl:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              className="relative w-full sm:w-auto"
            >
              <AnimatePresence>
                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/60 to-violet-500/60 rounded-full blur-lg -z-10"
                  />
                )}
              </AnimatePresence>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/70 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group border border-primary/20 hover:border-primary/40 relative overflow-hidden w-full sm:w-auto text-sm sm:text-base"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <span className="relative z-10">{t("common.tryNow")}</span>
                <motion.div
                  className="relative z-10 ml-2"
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-primary/30 hover:bg-gradient-to-r hover:from-primary/5 hover:to-violet-500/5 transition-all duration-300 backdrop-blur-md group hover:border-primary/50 w-full sm:w-auto text-sm sm:text-base"
                onClick={() => router.push(`en/about`)}
              >
                <span>{t("common.learnMore")}</span>
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - YouTube Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="relative order-1 xl:order-2"
        >
          <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-violet-500/10 max-w-2xl mx-auto xl:max-w-none">
            <iframe
              src="https://www.youtube.com/embed/ZScmUKaQRIE?autoplay=0&mute=1&controls=1&rel=0&modestbranding=1"
              title="UzSummarize Demo Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Video overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating elements around video - hidden on mobile */}
          <motion.div
            className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-4 h-4 sm:w-8 sm:h-8 bg-primary/20 rounded-full blur-sm hidden sm:block"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-3 h-3 sm:w-6 sm:h-6 bg-violet-500/20 rounded-full blur-sm hidden sm:block"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.8, 0.5, 0.8],
            }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 backdrop-blur-md shadow-xl border border-primary/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToForm}
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </motion.div>
      </motion.div>

      <div id="summarizer-form" className="-mt-16 sm:-mt-20" />
    </motion.section>
  )
}

export default Hero
