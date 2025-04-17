"use client"

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Database, FileText, Lock, UserCog, Mail } from 'lucide-react';

export default function PrivacyPage() {
    const t = useTranslations('privacy');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.main
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-24"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent inline-block">
                    {t('title')}
                </h1>
                <div className="mt-2 sm:mt-3 md:mt-4 w-12 sm:w-14 md:w-16 h-1 bg-primary/20 mx-auto rounded-full"></div>
            </motion.div>

            <div className="space-y-8 sm:space-y-12 mt-8 sm:mt-12">
                <motion.section
                    className="rounded-lg bg-card p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Shield className="w-6 h-6 text-primary" />
                        <h2 className="text-xl sm:text-2xl font-semibold">{t('introduction.title')}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {t('introduction.content')}
                    </p>
                </motion.section>

                <motion.section
                    className="rounded-lg bg-card p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Database className="w-6 h-6 text-primary" />
                        <h2 className="text-xl sm:text-2xl font-semibold">{t('dataCollection.title')}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                        {t('dataCollection.content')}
                    </p>
                    <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                        {[0, 1, 2].map((i) => (
                            <motion.li
                                key={i}
                                className="flex items-center gap-2 sm:gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                <span className="flex-1">{t(`dataCollection.points.${i}`)}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.section>

                <motion.section
                    className="rounded-lg bg-card p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <FileText className="w-6 h-6 text-primary" />
                        <h2 className="text-xl sm:text-2xl font-semibold">{t('dataUsage.title')}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {t('dataUsage.content')}
                    </p>
                </motion.section>

                <motion.section
                    className="rounded-lg bg-card p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                        <h2 className="text-xl sm:text-2xl font-semibold">{t('dataProtection.title')}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {t('dataProtection.content')}
                    </p>
                </motion.section>

                <motion.section
                    className="rounded-lg bg-card p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <UserCog className="w-6 h-6 text-primary" />
                        <h2 className="text-xl sm:text-2xl font-semibold">{t('userRights.title')}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {t('userRights.content')}
                    </p>
                </motion.section>
                {/* 
                <motion.section 
                    className="rounded-lg bg-card p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                >
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <Mail className="w-6 h-6 text-primary" />
                        <h2 className="text-xl sm:text-2xl font-semibold">{t('contact.title')}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {t('contact.content')}
                    </p>
                </motion.section> */}
            </div>
        </motion.main>
    );
}