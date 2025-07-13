import type { Metadata } from "next";
import 'katex/dist/katex.min.css';
import { Nunito } from 'next/font/google';
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';
import { ErrorBoundary } from "@/components/error-boundary";

const fontHeading = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL('https://latex-generator-ai-production.up.railway.app/'),
  title: {
    default: "STEM Hub - AI-Powered Formula Search & LaTeX Generator",
    template: "%s | STEM Hub"
  },
  description: "Advanced STEM platform powered by AI. Search formulas, generate LaTeX code, and access comprehensive STEM resources. Perfect for students, researchers, and educators.",
  keywords: ["STEM", "LaTeX", "formula search", "mathematics", "science", "engineering", "AI", "Gemini API", "academic research"],
  authors: [{ name: "Seokhyeon Byun", url: "https://www.seokhyeonbyun.com/" }],
  creator: "Seokhyeon Byun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://latex-generator-ai-production.up.railway.app/",
    title: 'STEM Hub - AI-Powered Formula Search & LaTeX Generator',
    description: 'Your comprehensive platform for STEM education and research. Advanced tools for formulas, proofs, and scientific computing.',
    images: [{
      url: '/opengraph-image.png',
      width: 1200,
      height: 630,
      alt: 'STEM Hub - AI-Powered Formula Search'
    }],
    siteName: 'STEM Hub'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STEM Hub - AI-Powered Formula Search & LaTeX Generator',
    description: 'Advanced STEM platform powered by AI. Search formulas and generate LaTeX code instantly.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable,
        )}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-col flex-1">{children}</main>
          </div>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
