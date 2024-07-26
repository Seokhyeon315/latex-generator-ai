import type { Metadata } from "next";
import 'katex/dist/katex.min.css';
import { Inter as FontSans } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from '@/components/ui/sonner'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Pro Formula",
  description: "Pro Formula is a tool that helps you to find the formula of any equation. You can search the equation name or upload an image of your formula with Latex form quickly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        'font-sans antialiased',
        fontSans.variable
      )}>
        <Toaster position="top-center" />
        <Navbar />
        <div className="flex flex-col min-h-screen px-4">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
