"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1]
  const t = useTranslations('notFound')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 relative z-10"
        >
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-7xl font-bold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-2"
          >
            <h2 className="text-2xl font-semibold text-foreground">{t('title')}</h2>
            <p className="text-foreground/70">{t('description')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-4"
          >
            <Link href={`/${locale}`}>
              <Button className="rounded-full px-6 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:translate-y-[-2px] group cursor-pointer">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                {t('button')}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated decorative elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/30 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary/20 rounded-full"
      />
      <motion.div
        animate={{
          y: [-10, 0, -10],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-primary/25 rounded-full"
      />
      <motion.div
        animate={{
          y: [10, 0, 10],
          opacity: [0.15, 0.4, 0.15]
        }}
        transition={{ duration: 4.5, repeat: Infinity }}
        className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary/15 rounded-full"
      />
      <motion.div
        animate={{
          y: [-5, 5, -5],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/2 right-1/2 w-2 h-2 bg-primary/10 rounded-full"
      />
    </div>
  )
}
