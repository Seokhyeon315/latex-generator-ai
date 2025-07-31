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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from 'sonner';
import { Formula } from '@/lib/types';
import { getMoreFormulas } from '@/lib/server-actions/multistep-search';
import { SelectionPath } from './selection-path';
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';

// Dynamic imports for heavy components
const CopyToClipboard = dynamic(() => import('@/components/copy-to-clipboard').then(mod => ({ default: mod.CopyToClipboard })), {
    loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>,
    ssr: false
});

export interface MultiStepPanelProps {
    id?: string;
}

const MAX_FORMULAS = 20; // Set maximum number of formula




export function MultiStepSearchPanel() {
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

    const loadInitialFormulas = React.useCallback(async () => {
        if (!selectedCategory || !selectedField || !selectedTopic) return;

        setLoading(true);
        setError(null);

        try {
            console.log('Starting to load formulas for:', {
                category: selectedCategory,
                field: selectedField,
                topic: selectedTopic
            });

            const result = await getMoreFormulas({
                category: selectedCategory,
                field: selectedField,
                topic: selectedTopic
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
    }, [selectedCategory, selectedField, selectedTopic]);

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
    }, [selectedTopic, selectedField, selectedCategory, loadInitialFormulas]);

    const renderFormula = (formula: Formula) => {
        return (
            <div className="card card-hover animate-slide-up">
                <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-primary-900 mb-2">{formula.formulaName}</h3>
                        <p className="text-base text-primary-600 leading-relaxed">{formula.description}</p>
                    </div>

                    {/* Usage Section */}
                    <div className="mb-6">
                        <div className="bg-primary-50 p-6 rounded-xl border border-primary-200">
                            <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                Usage
                            </h4>
                            <p className="text-primary-700 leading-relaxed">{formula.usage}</p>
                        </div>
                    </div>

                    {/* LaTeX Code Section */}
                    <div>
                        <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            LaTeX Code
                        </h4>
                        <div className="relative group">
                            <div className="bg-primary-900 p-6 rounded-xl border border-primary-700 relative overflow-hidden">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <CopyToClipboard text={formula.latexCode} />
                                </div>
                                <pre className="text-sm sm:text-base text-green-400 font-mono break-all whitespace-pre-wrap overflow-hidden pr-16">
                                    <code>{formula.latexCode.replace(/\$\$/g, '')}</code>
                                </pre>
                            </div>
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
                        getFieldsForCategory().flatMap((category) => 
                            category.fields.map((field) => (
                                <ListFields
                                    key={field.id}
                                    summary={{
                                        fieldName: field.name,
                                        description: field.description,
                                        useCases: category.useCases,
                                        topics: field.topics
                                    }}
                                    category={selectedCategory || ''}
                                    setLoading={setLoading}
                                    setSelectedTopic={setSelectedTopic}
                                    setSelectedField={setSelectedField}
                                />
                            ))
                        )
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
                    <div className="flex justify-center mt-8 mb-4 animate-fade-in">
                        <Button
                            onClick={handleLoadMore}
                            disabled={isLoadingMore}
                            className="btn btn-outline px-8 py-4 group transition-all duration-300 hover:scale-105"
                        >
                            {isLoadingMore ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    <span>Loading more formulas...</span>
                                </>
                            ) : (
                                <>
                                    <span className="font-medium">Load More Formulas</span>
                                    <Badge className="ml-3 bg-primary-600 text-white group-hover:bg-primary-700 transition-colors">
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
        <div className="w-full min-h-screen bg-primary-50/30 px-4 sm:px-6 lg:px-8 pb-8">
            <div className="text-center mb-8 animate-fade-in">
                <h1
                    className={`mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-center transition-all duration-300 ${
                        categoryClicked 
                            ? 'text-primary-600 hover:text-primary-800 cursor-pointer underline underline-offset-4 decoration-2 decoration-primary-400/50' 
                            : 'text-primary-900'
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
                
                {!categoryClicked && (
                    <p className="text-lg sm:text-xl text-primary-600 max-w-2xl mx-auto leading-relaxed">
                        Browse through curated <span className="text-primary-800 font-semibold">STEM categories</span> to discover formulas and theorems step by step
                    </p>
                )}
            </div>

            {/* Three categories icon cards */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 transition-all duration-500 ease-in-out">
                {categories.map((category, index) => (
                    <div
                        key={category.name}
                        className={`group relative cursor-pointer transition-all duration-500 transform animate-slide-up ${
                            categoryClicked ? 'w-full sm:w-32 h-16' : 'w-full sm:w-48 h-36'
                        } ${
                            selectedCategory === category.name 
                                ? 'scale-105' 
                                : categoryClicked && selectedCategory !== category.name 
                                    ? 'opacity-50 cursor-not-allowed scale-95' 
                                    : 'hover:scale-105'
                        }`}
                        style={{animationDelay: `${index * 0.1}s`}}
                        onClick={() => !categoryClicked && handleCategorySelect(category.name)}
                    >
                        <div className={`
                            card card-hover h-full p-6 relative overflow-hidden transition-all duration-300
                            ${selectedCategory === category.name 
                                ? 'border-accent-400 bg-accent-50/50 shadow-large' 
                                : 'hover:border-primary-300'
                            }
                        `}>
                            {/* Background gradient overlay */}
                            <div className={`absolute inset-0 bg-primary-50 transition-opacity duration-300 ${
                                selectedCategory === category.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                            }`}></div>
                            
                            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                                {!categoryClicked && (
                                    <div className={`text-5xl sm:text-6xl mb-4 transition-all duration-300 ${
                                        selectedCategory === category.name ? 'text-accent-600' : 'text-primary-700'
                                    }`}>
                                        {category.icon}
                                    </div>
                                )}
                                <div className={`font-bold transition-all duration-300 ${
                                    categoryClicked ? 'text-lg' : 'text-xl sm:text-2xl'
                                } ${
                                    selectedCategory === category.name 
                                        ? 'text-accent-700' 
                                        : 'text-primary-900 group-hover:text-accent-700'
                                }`}>
                                    {category.name}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selection Path with updated count */}
            {categoryClicked && (
                <div className="mt-6 sticky top-16 z-10 bg-white/95 backdrop-blur-sm py-4 border-y border-primary-200 shadow-soft animate-slide-down">
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
