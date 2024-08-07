'use client';

import React, { useState } from 'react';
import ListTopics from '@/components/multistep-search/list-topics'; // Import the ListTopics component
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface ListFieldsProps {
    summary: {
        fieldName: string;
        description: string;
        useCases: string[];
        topics: string[];
    };
    category: string;
}

// Component to display each field's information
export const ListFields = ({ summary, category }: ListFieldsProps) => {
    const { fieldName, description, useCases, topics } = summary;

    // State to manage which field's topics are open
    const [openField, setOpenField] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // State to manage loading

    // Function to toggle the accordion
    const toggleAccordion = (fieldName: string) => {
        // Set loading to true initially
        setLoading(true);
        setOpenField((prevField) => (prevField === fieldName ? null : fieldName));

        // Simulate a delay using setTimeout
        setTimeout(() => {
            // Set loading to false after the delay
            setLoading(false);
        }, 1000); // Adjust the delay time as needed
    };

    return (
        <div
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in cursor-pointer relative"
            onClick={() => toggleAccordion(fieldName)}
        >
            {/* Responsive grid: stack on small screens, columns on large */}
            <div className="grid gap-6 lg:grid-cols-3 flex-col lg:flex-row">
                {/* Field Section */}
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Field
                    </span>
                    <span className="mt-1 text-lg font-bold text-gray-900">
                        {fieldName}
                    </span>
                </div>
                {/* Description Section */}
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Description
                    </span>
                    <span className="mt-1 text-base text-gray-700">{description}</span>
                </div>
                {/* Applications Section */}
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Applications
                    </span>
                    <ul className="mt-1 text-base text-gray-700 list-disc pl-5 space-y-1">
                        {useCases.map((useCase, index) => (
                            <li key={index} className="flex items-start">
                                {useCase}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Topics Section - Accordion with Loading Indicator */}
            {openField === fieldName && (
                <div>
                    {loading ? (
                        <div className="flex justify-center items-center p-4">
                            <svg
                                className="animate-spin h-5 w-5 text-blue-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                ></path>
                            </svg>
                            <span className="ml-2 text-gray-500">Loading topics...</span>
                        </div>
                    ) : (
                        <ListTopics category={category} field={fieldName} topics={topics} />
                    )}
                </div>
            )}
        </div>
    );
};
