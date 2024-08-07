'use client';

import React, { useState } from 'react';
import { ListTopics } from '@/components/multistep-search/list-topics'; // Import the ListTopics component

interface ListFieldsProps {
    summary: {
        fieldName: string;
        description: string;
        useCases: string[];
        topics: string[];
    };
    category: string;
    setLoading: (loading: boolean) => void;
}

// Component to display each field's information
export const ListFields = ({ summary, category, setLoading }: ListFieldsProps) => {
    const { fieldName, description, useCases, topics } = summary;

    // State to manage which field's topics are open
    const [openField, setOpenField] = useState<string | null>(null);

    // Function to toggle the accordion
    const toggleAccordion = (fieldName: string) => {
        setOpenField((prevField) => (prevField === fieldName ? null : fieldName));
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

            {/* Topics Section - Accordion */}
            {openField === fieldName && (
                <ListTopics category={category} field={fieldName} topics={topics} setLoading={setLoading} />
            )}
        </div>
    );
};
