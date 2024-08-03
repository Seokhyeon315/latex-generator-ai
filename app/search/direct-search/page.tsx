import { AI } from "@/lib/actions";
import React from "react";
import { DirectSearchPanel } from '@/components/DirectSearchPanel';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Direct Search",
    description: "Direct search page is for people who already know the name of the formula, equation, or theorem. It provides the rendered version, explanation, usuage, and LaTeX code for students and researchers.",
};

export default function DirectSearchPage() {
    return (
        <AI>
            <div className="group w-full overflow-auto">
                {/* Empty screen here includes title, instructions, examples */}
                <DirectSearchPanel />
            </div>
        </AI>
    );
}