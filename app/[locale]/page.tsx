import Hero from "@/components/hero";
import Features from "@/components/shared/features";
import SummarizeForm from "@/components/summarize-form";
import { UrlSummarizer } from "@/components/url-summarizer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto py-8">
        <SummarizeForm />
        <div className="mt-8">
          <UrlSummarizer />
        </div>
      </div>
      {/* <div className="container mx-auto py-8">
        <ImageSummarizer />
      </div> */}
      <Features />
    </>
  );
}