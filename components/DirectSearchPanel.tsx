'use client';

import * as React from 'react';
import Textarea from 'react-textarea-autosize';
import { readStreamableValue, useActions } from 'ai/rsc';
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { Loading } from '@/components/loading';
import { EmptyDirectScreen } from '@/components/empty-direct-screen';
import { ErrorState } from './error-state';
import dynamic from 'next/dynamic';

// Dynamic imports for heavy components
const FormulaRenderer = dynamic(() => import('@/components/FormulaRenderer').then(mod => ({ default: mod.FormulaRenderer })), {
    loading: () => <div className="animate-pulse bg-gray-200 h-20 rounded"></div>,
    ssr: false
});

const MarkdownRender = dynamic(() => import('@/components/markdown-render'), {
    loading: () => <div className="animate-pulse bg-gray-200 h-16 rounded"></div>,
    ssr: false
});

const PaperReferences = dynamic(() => import('./PaperReferences').then(mod => ({ default: mod.PaperReferences })), {
    loading: () => <div className="animate-pulse bg-gray-200 h-24 rounded"></div>,
    ssr: false
});

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


    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const value = input.trim();

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
        <div className='w-full min-h-screen bg-primary-50/30 pb-safe'>
            <div className="mx-auto sm:max-w-2xl sm:px-4 px-4">
                {isLoading ? (
                    <div className="flex h-screen items-center justify-center text-xl mt-2 pb-6">
                        <Loading isLoading={isLoading} />
                    </div>
                ) : error || (response.length > 0 && response[0].formulas[0].formulaName === 'Error') ? (
                    <div className="flex min-h-[80vh] items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-gray-600 text-lg">Something went wrong</p>
                            <ErrorState onRetry={handleRetry} />
                        </div>
                    </div>
                ) : response.length > 0 ? (
                    <div className="flex flex-col min-h-screen">
                        <div className="flex-1 mt-4 pb-24 animate-fade-in">
                            <div className="space-y-6 max-h-none w-full">
                                {response.map((line, i) => (
                                    <div key={i} className="card card-hover animate-slide-up" style={{animationDelay: `${i * 0.1}s`}}>
                                        <div className="p-6 sm:p-8">
                                            {/* Header Section */}
                                            <div className="mb-6">
                                                <h3 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-2">{line.formulas[0].formulaName}</h3>
                                                <p className="text-base sm:text-lg text-primary-600 leading-relaxed">{line.formulas[0].description}</p>
                                            </div>

                                            {/* Formula Display Section */}
                                            <div className="mb-6">
                                                <div className="glass-card p-6 text-center bg-primary-50/50">
                                                    <FormulaRenderer formula={line.formulas[0].latexCode} />
                                                </div>
                                            </div>

                                            {/* Explanation Section */}
                                            <div className="mb-6">
                                                <div className="bg-primary-50 p-6 rounded-xl border border-primary-200">
                                                    <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                                                        Explanation
                                                    </h4>
                                                    <div className="prose prose-sm sm:prose-base">
                                                        <MarkdownRender content={line.formulas[0].explanation} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Usage Section */}
                                            <div className="mb-6">
                                                <div className="bg-primary-100/50 p-6 rounded-xl border border-primary-200">
                                                    <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                                        Usage
                                                    </h4>
                                                    <div className="prose prose-sm sm:prose-base">
                                                        <MarkdownRender content={line.formulas[0].usage} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* LaTeX Code Section */}
                                            <div className="mb-6">
                                                <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                                                    LaTeX Code
                                                </h4>
                                                <div className="relative group">
                                                    <div className="bg-primary-900 p-6 rounded-xl border border-primary-700 relative overflow-hidden">
                                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            <CopyToClipboard text={line.formulas[0].latexCode} />
                                                        </div>
                                                        <pre className="text-sm sm:text-base text-green-400 font-mono break-all whitespace-pre-wrap overflow-hidden pr-16">
                                                            {line.formulas[0].latexCode}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Academic References */}
                                            {line.formulas[0].academicReferences && line.formulas[0].academicReferences.length > 0 && (
                                                <div className="border-t border-primary-200 pt-6">
                                                    <PaperReferences
                                                        papers={line.formulas[0].academicReferences.map(ref => ({
                                                            title: ref.title,
                                                            authors: ref.authors.split(', '),
                                                            year: parseInt(ref.year),
                                                            significance: ref.significance,
                                                            link: `https://scholar.google.com/scholar?q=${encodeURIComponent(ref.title)}`
                                                        }))}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fixed search bar at bottom */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-primary-200 p-4 shadow-medium">
                            <div className="mx-auto sm:max-w-2xl">
                                <form onSubmit={handleSubmit} ref={formRef}>
                                    <div className="relative">
                                        <div className="glass-card border-2 border-primary-300 focus-within:border-accent-500 transition-all duration-300 overflow-hidden sm:rounded-full">
                                            <Textarea
                                                ref={inputRef}
                                                name="search"
                                                rows={1}
                                                maxRows={1}
                                                className="w-full min-h-[60px] bg-transparent placeholder:text-primary-500 resize-none px-6 py-[1.3rem] focus-within:outline-none text-primary-900 text-base sm:text-sm"
                                                spellCheck={false}
                                                autoComplete="off"
                                                autoCorrect="off"
                                                onKeyDown={onKeyDown}
                                                value={input}
                                                placeholder="Search for formulas, theorems, or equations..."
                                                onChange={e => setInput(e.target.value)}
                                                disabled={isLoading}
                                                aria-label="Search for formulas and theorems"
                                                aria-describedby="search-instructions"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                <Button
                                                    size="icon"
                                                    type='submit'
                                                    disabled={input === ''}
                                                    aria-label="Submit search query"
                                                    className="btn-primary min-h-[44px] min-w-[44px] rounded-full shadow-medium hover:shadow-large transition-all duration-200 disabled:opacity-50"
                                                >
                                                    <SearchIcon className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex min-h-[80vh] pb-6 lg:justify-center lg:items-center'>
                        <EmptyDirectScreen />

                        {/* Search form for empty state */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-primary-200 p-4 shadow-medium">
                            <div className="mx-auto sm:max-w-2xl">
                                <form onSubmit={handleSubmit} ref={formRef}>
                                    <div className="relative">
                                        <div className="glass-card border-2 border-primary-300 focus-within:border-accent-500 transition-all duration-300 overflow-hidden sm:rounded-full">
                                            <Textarea
                                                ref={inputRef}
                                                name="search"
                                                rows={1}
                                                maxRows={1}
                                                className="w-full min-h-[60px] bg-transparent placeholder:text-primary-500 resize-none px-6 py-[1.3rem] focus-within:outline-none text-primary-900 text-base sm:text-sm"
                                                spellCheck={false}
                                                autoComplete="off"
                                                autoCorrect="off"
                                                autoFocus
                                                required
                                                onKeyDown={onKeyDown}
                                                value={input}
                                                placeholder="Search for formulas, theorems, or equations..."
                                                onChange={e => setInput(e.target.value)}
                                                disabled={isLoading}
                                                aria-label="Search for formulas and theorems"
                                                aria-describedby="search-instructions"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                <Button
                                                    size="icon"
                                                    type='submit'
                                                    disabled={input === ''}
                                                    aria-label="Submit search query"
                                                    className="btn-primary min-h-[44px] min-w-[44px] rounded-full shadow-medium hover:shadow-large transition-all duration-200 disabled:opacity-50"
                                                >
                                                    <SearchIcon className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}