'use client';

import * as React from 'react';
import type { AI } from '@/lib/actions';
import { useAIState, useActions, useUIState } from 'ai/rsc';
import { Card } from './ui/card';
import { GiMaterialsScience, GiBigGear } from 'react-icons/gi';
import { BiMath } from 'react-icons/bi';

export interface SearchPanelProps extends React.ComponentProps<'div'> {
    id?: string;
}

export function MultiStepSearchPanel({ id }: SearchPanelProps) {
    const [aiState] = useAIState();
    const [messages, setMessages] = useUIState<typeof AI>();
    const { multiStepSearchAction } = useActions();
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

    // Sample categories for display
    const categories = [
        { name: 'Math', icon: <BiMath /> },
        { name: 'Science', icon: <GiMaterialsScience /> },
        { name: 'Engineering', icon: <GiBigGear /> },
    ];

    // Handle category selection
    const handleCategorySelect = async (category: string) => {
        setSelectedCategory(category);
        // Trigger the server action for the selected category
        const response = await multiStepSearchAction({ category });
        // Process response as needed
        setMessages(response.messages);
    };

    return (
        <div className="mx-auto sm:max-w-2xl sm:px-4">
            <div className="flex flex-col gap-4">
                <h1 className="mb-4 text-4xl font-semibold text-center text-gray-800">
                    Choose a Category
                </h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {categories.map((category) => (
                        <Card
                            key={category.name}
                            className={`p-6 cursor-pointer transition-colors duration-300 rounded-lg border shadow-md ${selectedCategory === category.name
                                    ? 'bg-gray-800 text-white border-gray-700'
                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-300'
                                }`}
                            onClick={() => handleCategorySelect(category.name)}
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-4xl">{category.icon}</span>
                                <span className="mt-2 text-lg font-medium">{category.name}</span>
                            </div>
                        </Card>
                    ))}
                </div>
                {selectedCategory && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
                        <h2 className="text-xl font-semibold text-blue-800">
                            Selected Category: {selectedCategory}
                        </h2>
                        <p className="mt-2 text-blue-600">
                            You have selected the {selectedCategory} category. Please wait while we fetch the relevant content.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
