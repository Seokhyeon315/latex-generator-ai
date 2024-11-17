import { MultiStepSearchPanel } from '@/components/multistep-search/MultiSearchPanel';
import { AI } from "@/lib/actions";
import { Metadata } from 'next';
import React from "react";
import { ErrorBoundary } from '@/components/error-boundary';


export const metadata: Metadata = {
    title: "Multi-Step Search",
    description: "Multi-step search page is for people who don't know or remember the name of the formula, equation, or theorem. It provides the rendered version, explanation, and LaTeX code for students and researchers.",
};

export default function MultiStepSearchPage() {
    return (
        <AI >
            <ErrorBoundary>
                <MultiStepSearchPanel />
            </ErrorBoundary>
        </AI >
    );
}