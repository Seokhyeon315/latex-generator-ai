'use client'
import { useRef } from "react";
import DescriptionSection from "@/components/Description";
import Hero from "@/components/Hero";

export default function Home() {
  const descriptionRef = useRef<HTMLDivElement>(null);

  const scrollToDescription = () => {
    descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero section */}
      <Hero scrollToDescription={scrollToDescription} />

      {/* Descriptions */}
      <div ref={descriptionRef}>
        <DescriptionSection />
      </div>

      {/* Features section with more details */}
    </main>
  );
}
