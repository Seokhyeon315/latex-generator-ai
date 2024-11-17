'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { GiMaterialsScience, GiBigGear } from 'react-icons/gi';
import { BiMath } from 'react-icons/bi';
import { BackToTopButton } from '@/components/back-to-top';
import { EmptyMultistepScreen } from '@/components/multistep-search/empty-multistep-screen';
import { mathFields, scienceFields, engineeringFields } from '@/lib/category-fields';
import { ListFields } from './list-fields';
import { Loading } from '../loading';
import { Output } from './output';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from 'sonner';
import { Formula } from '@/lib/types';
import { getMoreFormulas } from '@/lib/server-actions/multistep-search';
import { SelectionPath } from './selection-path';
import { FormulaRenderer } from '@/components/FormulaRenderer';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { Badge } from "@/components/ui/badge";

export interface MultiStepPanelProps {
    id?: string;
}

const MAX_FORMULAS = 20; // Set maximum number of formulas

// Add these type definitions at the top of the file
type TopicsList = string[];

interface FieldTopics {
    [key: string]: TopicsList;
}

interface ReliableTopics {
    [key: string]: FieldTopics;
}

export function MultiStepSearchPanel({ id }: MultiStepPanelProps) {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [categoryClicked, setCategoryClicked] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const [formulas, setFormulas] = React.useState<Formula[]>([]);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [error, setError] = React.useState<string | null>(null);

    const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);
    const [selectedField, setSelectedField] = React.useState<string | null>(null);

    const [totalFormulaCount, setTotalFormulaCount] = React.useState<number>(0);

    const categories = [
        { name: 'Math', icon: <BiMath /> },
        { name: 'Science', icon: <GiMaterialsScience /> },
        { name: 'Engineering', icon: <GiBigGear /> },
    ];

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setCategoryClicked(true);
        // Reset states when category changes
        setFormulas([]);
        setCurrentPage(1);
        setHasMore(true);
        setError(null);
    };

    const getFieldsForCategory = () => {
        switch (selectedCategory) {
            case 'Math':
                return mathFields;
            case 'Science':
                return scienceFields;
            case 'Engineering':
                return engineeringFields;
            default:
                return [];
        }
    };

    const handleLoadMore = async () => {
        if (isLoadingMore) return;

        // Check if we've reached the maximum limit
        if (formulas.length >= MAX_FORMULAS) {
            setHasMore(false);
            toast.info(`Maximum limit of ${MAX_FORMULAS} formulas reached`, {
                duration: 5000,
                dismissible: true,
            });
            return;
        }

        setIsLoadingMore(true);
        setError(null);

        try {
            if (!selectedCategory || !selectedField || !selectedTopic) {
                throw new Error('Please select all required fields');
            }

            const nextPage = currentPage + 1;
            const result = await getMoreFormulas({
                category: selectedCategory,
                field: selectedField,
                topic: selectedTopic,
                page: nextPage,
                existingFormulas: formulas
            });

            if (!result || result.length === 0) {
                setHasMore(false);
                toast.info('No more formulas available', {
                    duration: 5000,
                    dismissible: true,
                });
                return;
            }

            if (result.length < 5) {
                setHasMore(false);
                toast.info('All available formulas have been loaded', {
                    duration: 5000,
                    dismissible: true,
                });
            }

            const newFormulas = [...formulas, ...result];

            // Check if we'll reach the limit after adding new formulas
            if (newFormulas.length >= MAX_FORMULAS) {
                setHasMore(false);
                toast.info(`Maximum limit of ${MAX_FORMULAS} formulas reached`);
            } else {
                setHasMore(result.length >= 5);
            }

            // Only take up to MAX_FORMULAS
            const limitedFormulas = newFormulas.slice(0, MAX_FORMULAS);
            setFormulas(limitedFormulas);
            setTotalFormulaCount(limitedFormulas.length);
            setCurrentPage(nextPage);

        } catch (error) {
            console.error('Error loading more formulas:', error);
            setError(error instanceof Error ? error.message : 'Failed to load more formulas');
            toast.error('Failed to load more formulas. Please try again.', {
                duration: 5000,
                dismissible: true,
            });
        } finally {
            setIsLoadingMore(false);
        }
    };

    const loadInitialFormulas = async () => {
        if (!selectedCategory || !selectedField || !selectedTopic) return;

        setLoading(true);
        setError(null);

        try {
            console.log('Starting to load formulas for:', {
                category: selectedCategory,
                field: selectedField,
                topic: selectedTopic,
                page: 1
            });

            const result = await getMoreFormulas({
                category: selectedCategory,
                field: selectedField,
                topic: selectedTopic,
                page: 1
            });

            // Add detailed logging
            console.log('Raw API Result:', result);
            console.log('Result type:', typeof result);
            console.log('Is array:', Array.isArray(result));
            console.log('Length:', result?.length);

            // More explicit check for valid results
            if (result && Array.isArray(result) && result.length > 0 && result[0].formulaName) {
                console.log('Valid formulas received:', result.length);
                setFormulas(result);
                setTotalFormulaCount(result.length);
                setHasMore(result.length >= 5);
                toast.success('Formulas loaded successfully!');
                return;
            }

            // If we reach here, try one more time
            console.log('First attempt failed, retrying...');
            await new Promise(resolve => setTimeout(resolve, 2000)); // Longer delay

            const retryResult = await getMoreFormulas({
                category: selectedCategory,
                field: selectedField,
                topic: selectedTopic,
                page: 1,
                retryAttempt: true // Add flag to indicate retry
            });

            // Check retry result
            console.log('Retry result:', retryResult);
            if (retryResult && Array.isArray(retryResult) && retryResult.length > 0 && retryResult[0].formulaName) {
                setFormulas(retryResult);
                setTotalFormulaCount(retryResult.length);
                setHasMore(retryResult.length >= 5);
                toast.success('Formulas loaded successfully!');
            } else {
                console.error('Both attempts failed to generate formulas');
                setFormulas([]);
                setTotalFormulaCount(0);
                setHasMore(false);
                toast.error('Unable to generate formulas at the moment. Please try again.');
            }

        } catch (error) {
            console.error('Error loading formulas:', error);
            setError('Unable to load formulas. Please try again.');
            toast.error('Failed to load formulas. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Remove the isRetryableCategory check since we're always retrying once
    React.useEffect(() => {
        if (selectedTopic && selectedField && selectedCategory) {
            console.log('Topic changed, loading formulas...');
            // Reset states before loading new formulas
            setFormulas([]);
            setTotalFormulaCount(0);
            setHasMore(true);
            setError(null);
            setCurrentPage(1);
            loadInitialFormulas();
        }
    }, [selectedTopic, selectedField, selectedCategory]);

    const renderFormula = (formula: Formula) => {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{formula.formulaName}</h3>
                <p className="text-gray-600 mb-4">{formula.description}</p>

                {/* Usage Section */}
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Usage:</h4>
                    <p className="text-gray-600">{formula.usage}</p>
                </div>

                {/* LaTeX Code Section */}
                <div className="relative">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">LaTeX Code:</h4>
                    <div className="mt-2 p-3 bg-gray-50 rounded-md font-mono text-sm relative group">
                        <code className="text-gray-800">{formula.latexCode.replace(/\$\$/g, '')}</code>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <CopyToClipboard text={formula.latexCode} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderFormulasSection = () => {
        if (loading) {
            return (
                <div className='flex h-fit items-center justify-center pb-6'>
                    <Loading isLoading={loading} />
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center">
                    <p className="font-medium">{error}</p>
                    <p className="text-sm mt-2">Please try refreshing the page or selecting a different topic.</p>
                </div>
            );
        }

        // Only show "No formulas" message if we've actually tried to load formulas
        if (formulas.length === 0 && selectedTopic && selectedField && !loading) {
            return (
                <div className="bg-yellow-50 p-4 rounded-lg text-yellow-700 text-center">
                    <p className="font-medium">Temporarily unable to generate formulas</p>
                    <p className="text-sm mt-2">
                        We know there are formulas for {selectedTopic} in {selectedField}.
                        Please try again in a moment or select a different topic.
                    </p>
                    <Button
                        onClick={loadInitialFormulas}
                        variant="outline"
                        className="mt-4"
                        size="sm"
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        if (!selectedTopic || !selectedField) {
            return (
                <>
                    {categoryClicked ? (
                        getFieldsForCategory().map((field) => (
                            <ListFields
                                key={field.id}
                                summary={field}
                                category={selectedCategory || ''}
                                setLoading={setLoading}
                                setSelectedTopic={setSelectedTopic}
                                setSelectedField={setSelectedField}
                            />
                        ))
                    ) : (
                        <EmptyMultistepScreen />
                    )}
                </>
            );
        }

        return (
            <div className="space-y-6 mt-6">
                <div className="grid grid-cols-1 gap-6">
                    {formulas.map((formula, index) => (
                        <div key={index}>
                            {renderFormula(formula)}
                        </div>
                    ))}
                </div>

                {hasMore && formulas.length > 0 && (
                    <div className="flex justify-center mt-8 mb-4">
                        <Button
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            variant="outline"
                            size="lg"
                            className="flex items-center gap-2 px-6"
                        >
                            {isLoadingMore ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Loading more formulas...</span>
                                </>
                            ) : (
                                <>
                                    <span>Load More Formulas</span>
                                    <Badge variant="secondary" className="ml-2">
                                        +5
                                    </Badge>
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-8">
            <h1
                className={`mb-6 text-2xl sm:text-3xl lg:text-4xl font-semibold text-center ${categoryClicked ? 'text-gray-600 underline underline-offset-4 cursor-pointer hover:text-gray-800' : 'text-gray-800'
                    }`}
                onClick={() => {
                    router.refresh();
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }}
            >
                {categoryClicked ? 'Choose Again' : 'Choose a Category'}
            </h1>

            {/* Three categories icon cards */}
            <div className="flex justify-center space-x-4 transition-all duration-500 ease-in-out">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className={`flex items-center justify-center cursor-pointer transition-all duration-500 transform ${categoryClicked ? 'h-18 w-24' : 'h-32 w-40'
                            } ${selectedCategory === category.name ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} rounded-lg border border-gray-300 shadow-md ${categoryClicked && selectedCategory !== category.name ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => !categoryClicked && handleCategorySelect(category.name)}
                    >
                        <div className="flex flex-col items-center justify-center transition-opacity duration-500">
                            {!categoryClicked && (
                                <div className="text-4xl sm:text-5xl mb-2">
                                    {category.icon}
                                </div>
                            )}
                            <div className={`text-md sm:text-lg font-medium ${categoryClicked ? 'text-lg' : ''}`}>
                                {category.name}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selection Path with updated count */}
            {categoryClicked && (
                <div className="mt-6 sticky top-16 z-10 bg-gray-50/80 backdrop-blur-sm py-2">
                    <SelectionPath
                        category={selectedCategory}
                        field={selectedField}
                        topic={selectedTopic}
                        formulaCount={totalFormulaCount}
                    />
                </div>
            )}

            {/* Main Content */}
            <div className="mx-auto max-w-3xl">
                {renderFormulasSection()}
            </div>

            <BackToTopButton />
        </div>
    );
}
