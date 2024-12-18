'use client';

import * as React from 'react';
import Textarea from 'react-textarea-autosize';
import { readStreamableValue, useActions } from 'ai/rsc';
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { FormulaRenderer } from '@/components/FormulaRenderer';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import MarkdownRender from '@/components/markdown-render';
import { Loading } from '@/components/loading';
import { EmptyDirectScreen } from '@/components/empty-direct-screen';
import { PaperReferences } from './PaperReferences';
import { ErrorState } from './error-state';

interface PartialObject {
    formulas: {
        formulaName: string;
        description: string;
        usage: string;
        renderedFormula: string;
        explanation: string;
        latexCode: string;
        academicReferences?: {
            title: string;
            authors: string;
            year: string;
            significance: string;
        }[];
    }[];
}

export function DirectSearchPanel() {
    const [input, setInput] = React.useState<string>('');
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const [response, setResponse] = React.useState<PartialObject[]>([]);
    const { formRef, onKeyDown } = useEnterSubmit();
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { directSearchAction } = useActions();
    const [lastInput, setLastInput] = React.useState<string>('');

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = input.trim();
        setLastInput(value);
        await performSearch(value);
    };

    const performSearch = async (value: string) => {
        setInput('');
        setResponse([]);
        setError(null);

        if (!value) return;
        setIsLoading(true);

        try {
            const { object } = await directSearchAction(value);
            let foundValidData = false;

            for await (const partialObject of readStreamableValue<PartialObject>(object)) {
                if (partialObject && partialObject.formulas && partialObject.formulas.length > 0) {
                    foundValidData = true;
                    setResponse(prevResponse => [
                        ...prevResponse,
                        partialObject,
                    ]);
                }
            }

            if (!foundValidData) {
                setError('Formula not found');
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className='fixed inset-x-0 bg-white/90 bottom-1 w-full duration-300 ease-in-out'>
            <div className="mx-auto sm:max-w-2xl sm:px-4">
                {isLoading ? (
                    <div className="flex h-screen items-center justify-center text-xl mt-2 pb-6">
                        <Loading isLoading={isLoading} />
                    </div>
                ) : error || (response.length > 0 && response[0].formulas[0].formulaName === 'Error') ? (
                    <div className="flex h-[80vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-gray-600 text-lg">Something went wrong</p>
                            <ErrorState onRetry={handleRetry} />
                        </div>
                    </div>
                ) : response.length > 0 ? (
                    <div className="flex h-fit items-center justify-center mt-4 pb-6">
                        <div className="space-x-2 mt-4 max-h-[75vh] lg:max-h-[80vh] w-full overflow-y-auto">
                            {response.map((line, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-md mb-4">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold mb-1">{line.formulas[0].formulaName}</h3>
                                    </div>
                                    <div className="mb-4">
                                        <div className="bg-gray-100 p-4 rounded-lg">
                                            <FormulaRenderer formula={line.formulas[0].latexCode} />
                                        </div>
                                        <p className="pt-2 text-lg text-gray-700">{line.formulas[0].description}</p>
                                    </div>

                                    <div className="mb-4">
                                        <div className="bg-gray-100 p-4 rounded-lg">
                                            <h3 className="text-lg font-bold mb-1">Explanation</h3>
                                            <MarkdownRender content={line.formulas[0].explanation} />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="bg-gray-100 p-4 rounded-lg">
                                            <h3 className="text-lg font-bold mb-1">Usuage</h3>
                                            <MarkdownRender content={line.formulas[0].usage} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold mb-1">LaTeX Code:</h3>
                                        <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                                            <pre className="overflow-x-auto">
                                                {line.formulas[0].latexCode}
                                            </pre>
                                            <CopyToClipboard text={line.formulas[0].latexCode} />
                                        </div>
                                    </div>

                                    {line.formulas[0].academicReferences && line.formulas[0].academicReferences.length > 0 && (
                                        <PaperReferences
                                            papers={line.formulas[0].academicReferences.map(ref => ({
                                                title: ref.title,
                                                authors: ref.authors.split(', '),
                                                year: parseInt(ref.year),
                                                significance: ref.significance,
                                                link: `https://scholar.google.com/scholar?q=${encodeURIComponent(ref.title)}`
                                            }))}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='flex h-[80vh] pb-6 lg:justify-center lg:items-center'>
                        <EmptyDirectScreen />
                    </div>
                )}

                <div className="grid gap-4 sm:pb-4">
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-zinc-100 px-12 sm:rounded-full sm:px-12">
                            <Textarea
                                ref={inputRef}
                                name="search"
                                rows={1}
                                maxRows={1}
                                className="h-full w-full min-h-[60px] bg-transparent placeholder:text-zinc-900 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                                spellCheck={false}
                                autoComplete="off"
                                autoCorrect="off"
                                autoFocus
                                required
                                onKeyDown={onKeyDown}
                                value={input}
                                placeholder="Type the name of a formula or theorem."
                                onChange={e => setInput(e.target.value)}
                                disabled={isLoading}
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