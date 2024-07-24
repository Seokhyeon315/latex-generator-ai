'use client';

import React, { useState } from 'react';
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
    //     input: string;
    //     setInput: (input: string) => void;
    //     setResult: (result: { renderedFormula: string; latexCode: string } | null) => void;
}

export function SearchForm({ id }: SearchFormProps) {
    const [input, setInput] = useState('')
    const { pending } = useFormStatus()
    const { searchFormulaAction } = useActions()

    return (
        <form
            onSubmit={async (e: any) => {
                e.preventDefault();
                const value = input.trim()
                setInput('')
                if (!value) return

                try {
                    //Submit user input and get response via server action
                    const response = await searchFormulaAction(value)
                } catch (e) {
                    console.log(e)
                }

            }}
        >
            <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg"
                aria-disabled={pending}>
                <div className="flex-[1_0_0%]" >
                    <Label htmlFor="formula" className="sr-only">
                        Search a formula
                    </Label>
                    <Input
                        type="text"
                        name="search"
                        className="h-full"
                        id="search"
                        placeholder="Type the name of formula"
                        required
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </div>
                <div className="flex-[0_0_auto]">
                    <Button size={"icon"} type='submit'>
                        <SearchIcon />
                    </Button>
                </div>
            </div>
        </form>

    );
}
