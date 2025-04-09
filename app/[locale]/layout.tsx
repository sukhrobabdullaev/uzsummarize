import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Footer from '@/components/shared/footer';
import { Toaster } from "@/components/ui/sonner"
import Navbar from '@/components/shared/navbar';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "UzSummarize",
  description: "UzSummarize is a tool that allows you to summarize text quickly and easily.",
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("Failed to fetch module")) {
      notFound();
    }
    throw err;
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}