import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const codeMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-code-mono",
});

export const metadata: Metadata = {
  title: "Keploy Go Quickstart",
  description:
    "A beginner-friendly guide to running and testing a Go application with Keploy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${codeMono.variable}`}
    >
      {/*
        suppressHydrationWarning: extensions such as Grammarly add
        attributes (data-gr-ext-installed, data-new-gr-c-s-check-loaded)
        to <body> before React hydrates, which otherwise reports as a
        hydration mismatch in development.
      */}
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background font-sans text-foreground antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg"
          >
            Skip to content
          </a>

          {children}

          <Footer />
          <BackToTop />
          <ScrollReveal />
        </ThemeProvider>
      </body>
    </html>
  );
}
