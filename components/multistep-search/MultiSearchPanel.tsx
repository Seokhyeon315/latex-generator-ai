'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { GiMaterialsScience, GiBigGear } from 'react-icons/gi';
import { BiMath } from 'react-icons/bi';
import { BackToTopButton } from '@/components/back-to-top';
import { EmptyMultistepScreen } from '@/components/multistep-search/empty-multistep-screen';
import { mathFields, scienceFields, engineeringFields } from '@/lib/category-fields';
import { ListFields } from './list-fields';
import { useUIState } from 'ai/rsc';
import { Loading } from '../loading';

export interface MultiStepPanelProps {
    id?: string;
    input: string;
    setInput: (value: string) => void;
}

export function MultiStepSearchPanel({ id }: MultiStepPanelProps) {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [categoryClicked, setCategoryClicked] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const [messages, setMessages] = useUIState();

    const categories = [
        { name: 'Math', icon: <BiMath /> },
        { name: 'Science', icon: <GiMaterialsScience /> },
        { name: 'Engineering', icon: <GiBigGear /> },
    ];

    // Handle category selection
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setCategoryClicked(true);
    };

    // Determine which fields to display based on the selected category
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

    return (
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
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

                {/* Display list of fields of the selected category or output */}
                <div className="mx-auto sm:max-w-2xl sm:px-4 mt-6">
                    {/* Output of server response */}
                    {loading ? (
                        <Loading isLoading={true} /> // Set isLoading to true to indicate loading
                    ) : (
                        messages && messages.length > 0 && ( // Check if there are messages
                            <div>
                                {messages.map((message: any, index: any) => (
                                    <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                                        <h2 className="text-lg font-semibold mb-2">{message.name}</h2>
                                        <p className="text-gray-700 mb-2">{message.description}</p>
                                        <div className="p-4 bg-gray-100 rounded">
                                            <code className="text-sm text-gray-900">{message.latexCode}</code>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {!loading && messages.length === 0 && ( // Display fields only if not loading and no messages
                        <>
                            {categoryClicked ? (
                                getFieldsForCategory().map((field) => (
                                    <ListFields
                                        key={field.id}
                                        summary={field}
                                        category={selectedCategory || ''}
                                        setLoading={setLoading} // Pass setLoading to manage loading state
                                    />
                                ))
                            ) : (
                                <EmptyMultistepScreen />
                            )}
                        </>
                    )}
                </div>
            </div>
            <BackToTopButton />
        </div>
    );
}
