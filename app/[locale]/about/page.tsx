"use client"

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const About = () => {
  const t = useTranslations('about');

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-8 sm:space-y-12 lg:space-y-16">
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent inline-block">
            {t('title')}
          </h1>
          <div className="mt-3 sm:mt-4 w-12 sm:w-16 h-1 bg-primary/20 mx-auto rounded-full"></div>
        </motion.div>

        {/* Mission */}
        <motion.section 
          className="space-y-2 sm:space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-primary/80">{t('mission.title')}</h2>
          <p className="text-foreground/70 leading-relaxed text-sm sm:text-base lg:text-lg">
            {t('mission.description')}
          </p>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          className="space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-primary/80">{t('howItWorks.title')}</h2>
          <p className="text-foreground/70 leading-relaxed text-sm sm:text-base lg:text-lg">
            {t('howItWorks.description')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8">
            {[
              { key: 'input', step: t('howItWorks.steps.input.step'), title: t('howItWorks.steps.input.title'), description: t('howItWorks.steps.input.description') },
              { key: 'analyze', step: t('howItWorks.steps.analyze.step'), title: t('howItWorks.steps.analyze.title'), description: t('howItWorks.steps.analyze.description') },
              { key: 'identify', step: t('howItWorks.steps.identify.step'), title: t('howItWorks.steps.identify.title'), description: t('howItWorks.steps.identify.description') },
              { key: 'refine', step: t('howItWorks.steps.refine.step'), title: t('howItWorks.steps.refine.title'), description: t('howItWorks.steps.refine.description') },
              { key: 'deliver', step: t('howItWorks.steps.deliver.step'), title: t('howItWorks.steps.deliver.title'), description: t('howItWorks.steps.deliver.description') },
            ].map((item) => (
              <div
                key={item.key}
                className="group p-3 sm:p-4 lg:p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all duration-300 bg-background/50 backdrop-blur-sm"
              >
                <div className="text-xs sm:text-sm font-medium text-primary/40 mb-1 sm:mb-2 group-hover:text-primary/60 transition-colors">
                  {item.step}
                </div>
                <h3 className="font-medium text-sm sm:text-base lg:text-lg mb-1">{item.title}</h3>
                <p className="text-foreground/60 text-xs sm:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section 
          className="space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-primary/80">{t('features.title')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300 bg-background/50 backdrop-blur-sm group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">{t('features.pdfSummarization.title')}</h3>
              <p className="text-foreground/70 text-xs sm:text-sm lg:text-base">
                {t('features.pdfSummarization.description')}
              </p>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300 bg-background/50 backdrop-blur-sm group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">{t('features.imageAnalysis.title')}</h3>
              <p className="text-foreground/70 text-xs sm:text-sm lg:text-base">
                {t('features.imageAnalysis.description')}
              </p>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300 bg-background/50 backdrop-blur-sm group sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">{t('features.seamlessIntegration.title')}</h3>
              <p className="text-foreground/70 text-xs sm:text-sm lg:text-base">
                {t('features.seamlessIntegration.description')}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Technology */}
        <motion.section 
          className="space-y-2 sm:space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-primary/80">{t('technology.title')}</h2>
          <p className="text-foreground/70 leading-relaxed text-sm sm:text-base lg:text-lg">
            {t('technology.description')}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
            {["OpenAI", "React", "TailwindCSS", "Next.js", "Machine Learning"].map((tech, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 bg-primary/5 text-primary/70 rounded-full text-xs sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section 
          className="mt-10 sm:mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="p-5 sm:p-8 lg:p-10 rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-sm">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-primary/80 mb-3 sm:mb-4">{t('contact.title')}</h2>
            <p className="text-foreground/70 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              {t('contact.description')}
            </p>
            <a
              href="mailto:sukhrobabdullaevweb@gmail.com"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-300 text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="truncate max-w-[200px] sm:max-w-none">sukhrobabdullaevweb@gmail.com</span>
            </a>
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}

export default About
