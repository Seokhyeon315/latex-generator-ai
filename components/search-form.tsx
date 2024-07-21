'use client';

import React, { FormEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { useActions } from 'ai/rsc';
import { Paperclip } from 'lucide-react';
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface SearchFormProps {
    id?: string;
    input: string;
    setInput: (input: string) => void;
    setResult: (result: { renderedFormula: string; latexCode: string } | null) => void;
}

export function SearchForm({ id, input, setInput, setResult }: SearchFormProps) {
    const { formRef, onKeyDown } = useEnterSubmit();
    const { searchFormula } = useActions();
    const { pending } = useFormStatus();

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const value = input.trim();
    //     setInput('');
    //     if (!value) return;

    //     try {
    //         const formulaResult = await searchFormula(value);
    //         setResult(formulaResult);
    //     } catch (error) {
    //         console.error('Error searching formula:', error);
    //         setResult(null);
    //     }
    // };

    return (
        <form ref={formRef} action={() => {
            'use server';

        }}>
            <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                {/* Image upload icon */}
                <div className="items-center hover:text-gray-500 hidden">
                    <Paperclip />
                    {/* When click this icon, the ImageUpload panel will show up below the search input */}
                </div>

                <div className="flex-[1_0_0%]">
                    <Label htmlFor="formula" className="sr-only">
                        Search a formula
                    </Label>
                    <Input
                        type="text"
                        name="search"
                        className="h-full"
                        id="search"
                        placeholder="Search here"
                        required
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoComplete="off"
                        autoCorrect="off"
                    />
                </div>
                <div className="flex-[0_0_auto]">
                    <Button size={"icon"} type='submit' aria-disabled={pending}>
                        <SearchIcon />
                    </Button>
                </div>
            </div>
        </form>
    );
}
