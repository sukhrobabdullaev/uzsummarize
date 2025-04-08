import Hero from "@/components/hero";
import Features from "@/components/shared/features";
import SummarizeForm from "@/components/summarize-form";


export default function Home() {
  return (
    <>
      <Hero />
      <SummarizeForm />
      <Features />
    </>
  );
}