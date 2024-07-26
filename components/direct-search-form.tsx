'use client';

import * as React from 'react';
import Textarea from 'react-textarea-autosize';
import { readStreamableValue, useActions } from 'ai/rsc';
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import FormulaRenderer from '@/components/FormulaRenderer';
import { IconSpinner } from './ui/icons';

interface SearchFormProps {
    id?: string;
}

interface PartialObject {
    formulas: {
        formulaName: string;
        description: string;
        usuage: string;
        renderedFormula: string;
        where: string;
        latexCode: string;
    }[];
}

export function DirectSearchForm({ id }: SearchFormProps) {
    const [input, setInput] = React.useState<string>('');
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const [response, setResponse] = React.useState<PartialObject[]>([]);
    const { formRef, onKeyDown } = useEnterSubmit();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { directSearchAction } = useActions();

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const value = input.trim();
        setInput('');
        setResponse([]);
        if (!value) {
            return;
        }

        setIsLoading(true); // Set loading state to true when form submission starts

        try {
            const { object } = await directSearchAction(input);

            for await (const partialObject of readStreamableValue<PartialObject>(object)) {
                if (partialObject) {
                    setResponse(prevResponse => [
                        ...prevResponse,
                        partialObject,
                    ]);
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false); // Set loading state to false when form submission completes
        }
    };

    return (
        <div className='fixed inset-x-0 bg-white/90 bottom-0 w-full duration-300 ease-in-out'>
            <div className="mx-auto sm:max-w-2xl sm:px-4">
                {/* Output Display */}
                <div className="flex h-fit items-center justify-center mt-4 pb-6">
                    {isLoading ? <IconSpinner className='tex-xl' /> : (
                        <>
                            {response && response.map((line, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold mb-1">Formula Name:</h3>
                                        <p className="text-lg text-gray-700">{line.formulas[0].formulaName}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold mb-1">Description:</h3>
                                        <p className="text-lg text-gray-700">{line.formulas[0].description}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold mb-1">Usage:</h3>
                                        <p className="text-lg text-gray-700">{line.formulas[0].usuage}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold mb-1">Rendered Formula:</h3>
                                        <div className="bg-gray-100 p-4 rounded-lg">
                                            <FormulaRenderer formula={line.formulas[0].renderedFormula} />
                                        </div>
                                        <p className="p-2">{line.formulas[0].where}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-1">LaTeX Code:</h3>
                                        <div className="bg-gray-100 p-4 rounded-lg">
                                            <pre className="overflow-x-auto">{line.formulas[0].latexCode}</pre>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className="grid gap-4 sm:pb-4">
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-zinc-100 px-12 sm:rounded-full sm:px-12">
                            <Textarea
                                ref={inputRef}
                                name="search"
                                className="h-full w-full min-h-[60px] bg-transparent placeholder:text-zinc-900 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                                spellCheck={false}
                                autoComplete="off"
                                autoCorrect="off"
                                required
                                onKeyDown={onKeyDown}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                            />
                            <div className="absolute right-4 top-[13px] sm:right-4">
                                <Button size="icon" type='submit' disabled={input === ''}>
                                    <SearchIcon />
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
