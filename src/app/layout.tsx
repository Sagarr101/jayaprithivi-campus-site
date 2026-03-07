"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: site.fullName,
    template: `%s • ${site.fullName}`,
  },
  description: site.description,
};

import IntroAnimation from "@/components/IntroAnimation";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showIntro, setShowIntro] = useState(true);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased bg-gray-50 text-gray-700`}
      >
        {showIntro && (
          <IntroAnimation onFinish={() => setShowIntro(false)} />
        )}
        {!showIntro && (
          <>
            <SiteHeader />
            <main className="min-h-[calc(100dvh-64px)]">
              <div className="container mx-auto px-6">
                {children}
              </div>
            </main>
            <SiteFooter />
          </>
        )}
      </body>
    </html>
  );
}
