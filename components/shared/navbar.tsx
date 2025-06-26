"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight, Github, ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { LanguageSwitcher } from "@/components/shared/language-switcher"
import { useLocale, useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { ServicesDropdown } from "@/components/shared/service-dropdown"
import { ProductsDropdown } from "@/components/shared/products-dropdown"

const Navbar = () => {
  const t = useTranslations()
  const locale = useLocale()

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(`/${locale}`)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Set active item based on current path
    const path = window.location.pathname
    setActiveItem(path)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navItems = [
    { name: t("navigation.home"), path: `/${locale}` },
    { name: t("navigation.services"), component: <ServicesDropdown /> },
    { name: t("navigation.products"), component: <ProductsDropdown /> },
    { name: t("navigation.about"), path: `/${locale}/about` },
    // { name: t("navigation.changelog"), path: `/${locale}/changelog` }
  ]

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "py-2.5 bg-background/60 backdrop-blur-xl border-b border-white/5 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
        : "py-4 bg-background/30 backdrop-blur-md"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="group flex items-center gap-2.5">
            <div className="relative overflow-hidden w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-primary/30 group-hover:scale-105">
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
              ></motion.div>
              <span className="text-white text-sm font-bold relative z-10">Uz</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-violet-500 to-primary/70 bg-clip-text text-transparent">
                UzSummarize
              </span>
              <span className="text-[10px] text-foreground/60 -mt-1 tracking-wider font-medium">
                UZBEK AI SUMMARIZER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="mr-5 bg-accent/40 backdrop-blur-md rounded-full px-1.5 py-1.5 flex items-center border border-white/5 shadow-sm">
              {navItems.map((item) => {
                if (item.component) {
                  return <div key={item.name}>{item.component}</div>
                }

                const isActive = activeItem === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path || ""}
                    className="relative px-4 py-1.5 text-foreground/80 hover:text-foreground transition-all duration-200 text-sm rounded-full hover:bg-background/70 group"
                    onClick={() => setActiveItem(item.path)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-background/80 rounded-full shadow-sm border border-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:w-1/2" />
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher className="hidden sm:flex" />
              <motion.a
                href="https://github.com/sukhrobabdullaev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/70 hover:text-foreground transition-colors duration-200 rounded-full hover:bg-accent/60 border border-transparent hover:border-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 rounded-full px-3 sm:px-5 shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 border border-white/10 group"
                >
                  <Sparkles className="h-4 w-4 mr-1 sm:mr-2 group-hover:animate-ping" />
                  <span className="hidden sm:inline">{t("common.tryNow")}</span>
                </Button>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? t("navigation.closeMenu") : t("navigation.openMenu")}
                className="rounded-full hover:bg-accent/50 border border-transparent hover:border-white/5"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40"
              style={{ top: isScrolled ? "57px" : "73px" }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left"
              ></motion.div>

              <nav className="flex flex-col bg-background/80 p-6 space-y-2">
                {navItems.map((item, index) => {
                  if (item.component) {
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        {item.name === t("navigation.services") ? (
                          <ServicesDropdown isMobile={true} />
                        ) : item.name === t("navigation.products") ? (
                          <ProductsDropdown isMobile={true} />
                        ) : (
                          item.component
                        )}
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.path || ""}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/50 transition-all duration-200 group border border-transparent hover:border-white/5"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setActiveItem(item.path)
                        }}
                      >
                        <span className="text-lg font-medium">{item.name}</span>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          className="h-8 w-8 rounded-full bg-background/80 flex items-center justify-center border border-white/5 shadow-sm group-hover:bg-primary/10"
                        >
                          <ChevronRight className="h-4 w-4 text-primary group-hover:text-primary/80" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-4 origin-left"
                ></motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/30 transition-all duration-200 border border-transparent hover:border-white/5"
                >
                  <span className="text-sm font-medium text-foreground/70">{t("navigation.language")}</span>
                  <LanguageSwitcher />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <a
                    href="https://github.com/sukhrobabdullaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/50 transition-all duration-200 group border border-transparent hover:border-white/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <Github className="h-5 w-5 mr-3 text-foreground/70 group-hover:text-foreground transition-colors duration-200" />
                      <span className="text-lg font-medium">GitHub</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      whileTap={{ scale: 0.9 }}
                      className="h-8 w-8 rounded-full bg-background/80 flex items-center justify-center border border-white/5 shadow-sm group-hover:bg-primary/10"
                    >
                      <ExternalLink className="h-4 w-4 text-foreground/50 group-hover:text-primary/80 transition-colors duration-200" />
                    </motion.div>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="pt-6"
                >
                  <Button className="w-full py-6 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 border border-white/10 group">
                    <Sparkles className="h-5 w-5 mr-2 group-hover:animate-ping" />
                    {t("navigation.tryNow")}
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  )
}

export default Navbar
