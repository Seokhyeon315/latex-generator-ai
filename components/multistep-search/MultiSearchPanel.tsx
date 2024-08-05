'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { GiMaterialsScience, GiBigGear } from 'react-icons/gi';
import { BiMath } from 'react-icons/bi';
import { BackToTopButton } from '@/components/back-to-top';
import { EmptyMultistepScreen } from '@/components/multistep-search/empty-multistep-screen';
import { mathFields, scienceFields, engineeringFields } from '@/lib/category-fields';
import { ListFields } from './list-fields';

export interface SearchPanelProps extends React.ComponentProps<'div'> {
    id?: string;
}

export function MultiStepSearchPanel({ id }: SearchPanelProps) {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [isClicked, setIsClicked] = React.useState<boolean>(false);
    const router = useRouter();

    // Sample categories for display
    const categories = [
        { name: 'Math', icon: <BiMath /> },
        { name: 'Science', icon: <GiMaterialsScience /> },
        { name: 'Engineering', icon: <GiBigGear /> },
    ];

    // Handle category selection
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsClicked(true);
    };

    // Reset the selection and refresh the page
    const resetSelection = () => {
        setSelectedCategory(null);
        setIsClicked(false);

        // Use router to go back and then refresh
        router.refresh();
        setTimeout(() => {
            window.location.reload();
        }, 100);
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
                    className={`mb-6 text-2xl sm:text-3xl lg:text-4xl font-semibold text-center ${isClicked ? 'text-gray-600 underline underline-offset-4 cursor-pointer hover:text-gray-800' : 'text-gray-800'}`}
                    onClick={resetSelection}
                >
                    {isClicked ? 'Choose Again' : 'Choose a Category'}
                </h1>
                <div className={`flex justify-center space-x-4 transition-all duration-500 ease-in-out`}>
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className={`flex items-center justify-center cursor-pointer transition-all duration-500 transform ${isClicked ? 'h-18 w-24' : 'h-32 w-40'} ${selectedCategory === category.name ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} rounded-lg border border-gray-300 shadow-md ${isClicked && selectedCategory !== category.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => !isClicked && handleCategorySelect(category.name)}
                        >
                            <div className="flex flex-col items-center justify-center transition-opacity duration-500">
                                {!isClicked && (
                                    <div className="text-4xl sm:text-5xl mb-2">
                                        {category.icon}
                                    </div>
                                )}
                                <div className={`text-md sm:text-lg font-medium ${isClicked ? 'text-lg' : ''}`}>
                                    {category.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Display list of fields of the selected category */}
                {isClicked ? (
                    <div className="mx-auto sm:max-w-2xl sm:px-4 mt-6">
                        {getFieldsForCategory().map((field) => (
                            <ListFields key={field.id} summary={field} category={selectedCategory || ''} />
                        ))}
                        {/* If there is response, replace ListFields to MultiStepOuput */}
                    </div>
                ) : (
                    <EmptyMultistepScreen />
                )}
            </div>
            <BackToTopButton />
        </div>
    );
}
