'use client';

import { useState } from "react";
import { SearchForm } from "@/components/search-form";

export interface SearchProps extends React.ComponentProps<'div'> {
    id?: string

}

export function FormulaSearch({ id }: SearchProps) {

    const [input, setInput] = useState("");

    return (
        <div className="flex min-h-screen flex-col items-center">
            <div className="relative overflow-hidden">
                <div className="container py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Formula Search
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            Search the equation or formula name to get Latex form quickly
                        </p>
                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            <SearchForm
                                id={id}
                                input={input}
                                setInput={setInput} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Ouput Display here */}
        </div >
    );
}
