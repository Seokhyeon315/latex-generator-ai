'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { readStreamableValue, useActions } from 'ai/rsc';
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface SearchFormProps {
    id?: string;
}

export function DirectSearchForm({ id }: SearchFormProps) {
    const [input, setInput] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const { pending } = useFormStatus();
    const { directSearchAction } = useActions();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInput('');
        setResponse(''); // Clear the previous response
        const { output } = await directSearchAction(input);

        for await (const textPart of readStreamableValue(output)) {
            setResponse(currentResponse => `${currentResponse}${textPart}`);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg"
                    aria-disabled={pending}>
                    <div className="flex-[1_0_0%] max-w-md">
                        <Label htmlFor="formula" className="sr-only">
                            Search a formula
                        </Label>
                        <Input
                            type="text"
                            name="search"
                            className="h-full w-full"
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

            {/* Output Display */}
            {response && (
                <div className="p-4 bg-white rounded-lg shadow-md">
                    {/* Rendered Version */}
                    <div className="mb-4">
                        <h3 className="text-lg font-bold mb-2">Rendered Version:</h3>
                        <div className="p-2 bg-gray-100 rounded border">
                            <pre>{response}</pre>
                            <Button onClick={() => copyToClipboard(response)} className="mt-2">Copy Rendered Version</Button>
                        </div>
                    </div>

                    {/* LaTeX Code */}
                    <div>
                        <h3 className="text-lg font-bold mb-2">LaTeX Code:</h3>
                        <div className="p-2 bg-gray-100 rounded border">
                            <pre>{response}</pre>
                            <Button onClick={() => copyToClipboard(response)} className="mt-2">Copy LaTeX Code</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
