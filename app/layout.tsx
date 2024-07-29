import type { Metadata } from "next";
import 'katex/dist/katex.min.css';
import { Manrope } from 'next/font/google'
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from '@/components/ui/sonner'

const fontHeading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Pro Formula",
  description: "Pro Formula is a tool that helps you to find the formula of any equation. You can search the equation name or upload an image of your formula with Latex form quickly.",
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
