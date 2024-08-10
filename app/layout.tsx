import type { Metadata } from "next";
import 'katex/dist/katex.min.css';
import { Nunito } from 'next/font/google';
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from '@/components/ui/sonner'

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
  title: "Pro Formula",
  description: "Pro Formula is a tool that helps you to find the formula of any equation. You can search the equation name or upload an image of your formula with Latex form quickly. All the provided features are powered by Google Gemini API.",
  openGraph: {
    title: 'Title webtsite',
    description: 'this is the desciption',
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
    <html lang="en">
      <body className={cn(
        'antialiased',
        fontHeading.variable,
        fontBody.variable,
      )}>
        <Toaster position="top-center" />

        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex flex-col flex-1">{children}</main>
        </div>


        <Footer />
      </body>
    </html>
  );
}
