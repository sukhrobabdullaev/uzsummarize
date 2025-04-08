"use client"

import { FileText, Image, FileUp } from 'lucide-react'
import React from 'react'
import { useTranslations } from 'next-intl'

const Features = () => {
    const t = useTranslations()

    return (

        <section className="max-w-4xl mx-auto px-4 py-16">
            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12 md:mt-16">
                <div className="bg-background/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-md group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-all duration-300">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{t('features.textSummarization.title')}</h3>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                        {t('features.textSummarization.description')}
                    </p>
                </div>

                <div className="bg-background/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-md group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-all duration-300">
                        <Image className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{t('features.imageAnalysis.title')}</h3>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                        {t('features.imageAnalysis.description')}
                    </p>
                </div>

                <div className="bg-background/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-md group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-all duration-300">
                        <FileUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{t('features.pdfProcessing.title')}</h3>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                        {t('features.pdfProcessing.description')}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Features
