import { ImageDescription } from "@/components/ImageDescription"
import { useTranslations } from "next-intl"

export default function ImageDescriptionPage() {
  const t = useTranslations()

  return (
    <div className="max-w-6xl py-20 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            {t('imageDescription.title')}
          </span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          {t('imageDescription.description')}
        </p>
      </div>

      <ImageDescription />
    </div>
  )
}
