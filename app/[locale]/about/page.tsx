"use client"

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const services = [
  { key: "summarize", label: "Text Summarization", desc: "AI-powered summarization for Uzbek text, articles, and documents." },
  { key: "mindmap", label: "Mindmap Generator", desc: "Visualize topics and concepts with interactive mindmaps." },
  { key: "flashcards", label: "Flashcards", desc: "Create and study flashcards for effective learning." },
  { key: "study-notes", label: "Study Notes", desc: "Generate structured study notes at various difficulty levels." },
  { key: "image-description", label: "Image Description", desc: "Get AI-generated descriptions for images." },
  { key: "image-extraction", label: "Image Extraction", desc: "Extract text and information from images." },
  { key: "url-summarizer", label: "URL Summarizer", desc: "Summarize news, articles, and web pages by URL." },
  { key: "pdf-summarizer", label: "PDF Summarizer", desc: "Summarize PDF documents in Uzbek." },
];

const products = [
  { key: "uzsumlm", label: "UzSumLM", desc: "Next-gen Uzbek Summarization Language Model: text-to-summary, image-to-video, and more." },
  { key: "tts", label: "TTS (Text-to-Speech)", desc: "Natural-sounding Uzbek text-to-speech with multiple voices." },
  { key: "stt", label: "STT (Speech-to-Text)", desc: "High-accuracy Uzbek speech recognition and transcription." },
  { key: "u-chat-pdf", label: "U-chat-pdf", desc: "Chat with your PDF documents in Uzbek (coming soon)." },
];

const missions = [
  {
    key: "empower-uzbek",
    title: "Empower Uzbek Language AI",
    desc: "Advance AI technologies tailored for the Uzbek language, making them accessible and beneficial for everyone."
  },
  {
    key: "education",
    title: "Enhance Education",
    desc: "Provide innovative tools for students, educators, and researchers to simplify learning and boost productivity."
  },
  {
    key: "innovation",
    title: "Drive Innovation",
    desc: "Continuously develop state-of-the-art AI solutions for summarization, language processing, and knowledge extraction."
  },
  {
    key: "accessibility",
    title: "Promote Accessibility",
    desc: "Break language barriers and make information more accessible to Uzbek speakers worldwide."
  }
];

const gradientText = "bg-gradient-to-r from-primary via-violet-500 to-cyan-400 bg-clip-text text-transparent";
const glass = "backdrop-blur-lg bg-background/70 border border-primary/10 shadow-xl";

// Typing animation hook
function useTypingEffect(text: string, speed = 35, loop = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        i++;
        timeout = setTimeout(type, speed);
      } else if (loop) {
        setTimeout(() => {
          setDisplayed("");
          i = 0;
          type();
        }, 1200);
      }
    }
    type();
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [text, speed, loop]);
  return displayed;
}

export default function About() {
  const t = useTranslations('about');
  const typingText = useTypingEffect(products[3].desc, 30, true);

  return (
    <motion.div
      className="relative max-w-5xl mx-auto px-2 sm:px-4 md:px-8 pt-16 sm:pt-24 pb-10 sm:pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Futuristic background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-gradient-to-br from-primary/30 via-violet-500/20 to-cyan-400/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] right-0 w-[40vw] h-[30vw] bg-gradient-to-tr from-cyan-400/20 to-primary/10 rounded-full blur-2xl opacity-40" />
      </div>

      <div className="relative z-10 space-y-12 sm:space-y-16">
        {/* Header */}
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className={`text-3xl sm:text-5xl md:text-6xl font-extrabold ${gradientText} tracking-tight drop-shadow-lg`}>
            {"About Us"}
          </h1>
          <div className="mt-4 sm:mt-5 flex justify-center">
            <span className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm sm:text-base tracking-wide shadow-md backdrop-blur">
              The Future of Uzbek AI
            </span>
          </div>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-foreground/80 max-w-2xl mx-auto font-light">
            {"UzSummarize is a futuristic AI platform for summarization, learning, and productivity in the Uzbek language."}
          </p>
        </motion.header>

        {/* Missions & Purposes */}
        <motion.section
          className={`relative ${glass} rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-6 sm:py-10`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute -top-8 sm:-top-10 -right-8 sm:-right-10 w-28 sm:w-40 h-28 sm:h-40 bg-gradient-to-br from-primary/30 to-violet-400/20 rounded-full blur-2xl opacity-50 pointer-events-none" />
          <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${gradientText}`}>Our Mission & Purpose</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">{missions[0].title}</h3>
              <p className="text-foreground/70 mb-2 sm:mb-4">{missions[0].desc}</p>
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">{missions[1].title}</h3>
              <p className="text-foreground/70">{missions[1].desc}</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">{missions[2].title}</h3>
              <p className="text-foreground/70 mb-2 sm:mb-4">{missions[2].desc}</p>
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1 sm:mb-2">{missions[3].title}</h3>
              <p className="text-foreground/70">{missions[3].desc}</p>
            </div>
          </div>
        </motion.section>

        {/* Services & Products - Modern/Futuristic Layout */}
        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute -left-6 sm:-left-10 top-1/2 -translate-y-1/2 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-cyan-400/20 to-primary/10 rounded-full blur-2xl opacity-40 pointer-events-none" />
          <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${gradientText}`}>What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {/* Services */}
            <div className={`${glass} rounded-2xl p-4 sm:p-8 flex flex-col gap-4 sm:gap-6`}>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">AI Services</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <span className="font-semibold text-foreground">Summarization Suite:</span>
                  <span className="block text-foreground/70 ml-2">
                    {services[0].desc}
                    <span className="block text-xs text-foreground/50">PDF, URL, and image-based summarization included.</span>
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Learning Tools:</span>
                  <span className="block text-foreground/70 ml-2">
                    {services[2].desc} &amp; {services[3].desc}
                  </span>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Visual & Extraction:</span>
                  <span className="block text-foreground/70 ml-2">
                    {services[1].desc}, {services[4].desc}, {services[5].desc}
                  </span>
                </li>
              </ul>
            </div>
            {/* Products */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className={`${glass} rounded-2xl p-4 sm:p-8`}>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">{products[0].label}</h3>
                <p className="text-foreground/70">{products[0].desc}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className={`${glass} flex-1 rounded-2xl p-4 sm:p-5`}>
                  <h4 className="font-semibold text-primary">{products[1].label}</h4>
                  <p className="text-xs text-foreground/60">{products[1].desc}</p>
                </div>
                <div className={`${glass} flex-1 rounded-2xl p-4 sm:p-5`}>
                  <h4 className="font-semibold text-primary">{products[2].label}</h4>
                  <p className="text-xs text-foreground/60">{products[2].desc}</p>
                </div>
              </div>
              <div className={`${glass} rounded-2xl p-4 sm:p-5 text-xs text-foreground/60 font-mono`}>
                <span className="font-semibold">{products[3].label}:</span>{" "}
                <span>
                  {typingText}
                  <span className="inline-block w-2 h-5 align-middle bg-primary/80 animate-pulse ml-0.5 rounded-sm" />
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          className="relative text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 sm:-bottom-10 w-28 sm:w-40 h-28 sm:h-40 bg-gradient-to-tr from-primary/20 to-violet-400/10 rounded-full blur-2xl opacity-40 pointer-events-none" />
          <h2 className={`text-xl sm:text-2xl font-semibold mb-2 ${gradientText}`}>Contact</h2>
          <p className="text-foreground/70 mb-3 sm:mb-4 text-sm sm:text-base">For questions, feedback, or collaboration, email us:</p>
          <a
            href="mailto:sukhrobtech@gmail.com"
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-violet-500 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base font-medium"
          >
            sukhrobtech@gmail.com
          </a>
        </motion.section>
      </div>
    </motion.div>
  );
}
