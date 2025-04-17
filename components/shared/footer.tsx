"use client"

import type React from "react"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { useLocale } from "next-intl"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, ArrowUpRight, ChevronUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const Footer = () => {
  const t = useTranslations()
  const locale = useLocale()
  const [email, setEmail] = useState("")

  const footerLinks = [
    { href: `/${locale}/privacy`, label: t("footer.privacy") },
    { href: `/${locale}/about`, label: t("footer.about") },
    { href: `/${locale}/contact`, label: t("footer.contact") },
    { href: `/${locale}/terms`, label: "Terms of Service" },
    { href: `/${locale}/cookies`, label: "Cookie Policy" },
    { href: `/${locale}/support`, label: "Support" },
    { href: `/${locale}/faq`, label: "FAQ" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/sukhrobabdullaev", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/uzsummarize", label: "LinkedIn" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribed:", email)
    setEmail("")
  }

  return (
    <footer className="relative border-t bg-background">

  
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:pt-20 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="space-y-6">
            <Link href={`/${locale}`} className="group flex items-center gap-3 w-fit">
              <motion.div
                className="relative overflow-hidden w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(var(--color-primary), 0.3)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0,transparent_70%)]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.9, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-white text-sm font-bold relative z-10">Uz</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-violet-500 to-primary/70 bg-clip-text text-transparent">
                  UzSummarize
                </span>
                <span className="text-[10px] text-foreground/60 -mt-1 tracking-wider font-medium">
                  UZBEK AI SUMMARIZER
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("footer.description")}
            </p>

            {/* Newsletter subscription */}
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-3">{t("footer.newsletter")}</h3>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                  required
                />
                <Button type="submit" size="sm" className="h-9 px-3 sm:w-auto w-full">
                  <Send className="h-4 w-4 sm:mr-0 mr-2" />
                  <span className="sm:hidden">Subscribe</span>
                </Button>
              </form>
            </div>
          </div>

          {/* Links section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground/90 mb-4">{t("footer.links")}</h3>
            <nav className="grid grid-cols-1 gap-y-2.5">
              {footerLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              ))}
            </nav>
          </div>

          {/* More links section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground/90 mb-4">Resources</h3>
            <nav className="grid grid-cols-1 gap-y-2.5">
              {footerLinks.slice(4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Social links and back to top */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground/90 mb-4">{t("footer.socials")}</h3>
              <div className="mt-4 flex flex-col space-y-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <social.icon className="h-4 w-4 mr-2" />
                    {social.label}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              v1.1.0
            </span>
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Link href="https://www.sukhrob.io" className="inline-block underline mx-1" target="__blank">sukhrob.io</Link> in Uzbekistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
