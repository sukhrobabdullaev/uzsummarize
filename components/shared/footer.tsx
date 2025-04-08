"use client"

import { useTranslations } from 'next-intl'

const Footer = () => {
    const t = useTranslations()

    return (
        <footer className="py-8 px-4 text-center text-sm text-muted-foreground">
            <div className="max-w-7xl mx-auto">
                <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
            </div>
        </footer>
    )
}

export default Footer
