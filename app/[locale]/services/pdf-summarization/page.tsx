import PdfSummarization from "@/components/PdfSummarization"

export default function PdfSummarizationPage() {
  return (
    <div className="max-w-7xl py-12 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            PDF Summarizer
          </span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Upload your PDF documents and get concise summaries in Uzbek using advanced AI models.
        </p>
      </div>

      <PdfSummarization />
    </div>
  )
}
