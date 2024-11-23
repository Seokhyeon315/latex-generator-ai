import type { Metadata } from "next";
import 'katex/dist/katex.min.css';
import { Nunito } from 'next/font/google';
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';

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
  title: "STEM Hub",
  description: "Advanced STEM platform powered by AI. Featuring formula search, LaTeX generation, proof assistance, and comprehensive STEM resources. Integrating cutting-edge AI technologies.",
  openGraph: {
    title: 'STEM Hub',
    description: 'Your comprehensive platform for STEM education and research. Advanced tools for formulas, proofs, and scientific computing.',
    images: 'url/opengraph-img.png'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
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
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex flex-col flex-1">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
