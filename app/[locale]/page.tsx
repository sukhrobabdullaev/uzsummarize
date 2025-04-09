import Hero from "@/components/hero";
import Features from "@/components/shared/features";
import SummarizeForm from "@/components/summarize-form";

export default function Home() {
  return (
    <>
      <Hero />
      <SummarizeForm />
      {/* <div className="container mx-auto py-8">
        <ImageSummarizer />
      </div> */}
      <Features />
    </>
  );
}