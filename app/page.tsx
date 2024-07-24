'use client'
import { useRef } from "react";
import DescriptionSection from "@/components/Description";
import Hero from "@/components/Hero";

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero section */}
      <Hero />

      {/* Descriptions */}

      <DescriptionSection />


      {/* Features section with more details */}
    </main>
  );
}
