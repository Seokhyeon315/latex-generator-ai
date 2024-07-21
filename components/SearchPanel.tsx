'use client';

import { useState } from "react";
import { SearchForm } from "@/components/search-form";

export interface SearchPanelProps extends React.ComponentProps<'div'> {
    id?: string
}

export function SearchPanel({ id }: SearchPanelProps) {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<{ renderedFormula: string; latexCode: string } | null>(null);

    return (
        <div className="flex min-h-screen flex-col items-center">
            <div className="relative overflow-hidden">
                <div className="container py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Formula Search
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            Search the formula name or upload image of equations to get Latex form quickly!
                        </p>
                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            <SearchForm
                                id={id}
                                input={input}
                                setInput={setInput}
                                setResult={setResult} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Output Display panel here */}
            {result && (
                <div className="mt-4 p-3 border bg-background rounded-lg shadow-lg">
                    <div>
                        <strong>Rendered Formula:</strong>
                        <div>{result.renderedFormula}</div>
                    </div>
                    <div>
                        <strong>LaTeX Code:</strong>
                        <div>{result.latexCode}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
