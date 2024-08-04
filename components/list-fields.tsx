'use client';

import React from 'react';
import { useActions } from 'ai/rsc';

interface ListFieldsProps {
    summary: {
        fieldName: string;
        description: string;
        useCases: string[];
    };
}

// Component to display each field's information
export const ListFields = ({ summary }: ListFieldsProps) => {
    const { fieldName, description, useCases } = summary;
    const { multiStepSearchAction } = useActions();

    const handleFieldClick = async () => {
        try {
            // Trigger the server action with the field's information
            await multiStepSearchAction({
                fieldName,
                description,
                useCases,
            });
        } catch (error) {
            console.error('Error triggering server action:', error);
        }
    };

    return (
        <div
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in cursor-pointer"
            onClick={handleFieldClick} // Attach click handler
        >
            <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Field
                    </span>
                    <span className="mt-1 text-lg font-bold text-gray-900">
                        {fieldName}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Description
                    </span>
                    <span className="mt-1 text-base text-gray-700">
                        {description}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Applications
                    </span>
                    <ul className="mt-1 text-base text-gray-700 list-disc pl-5 space-y-1">
                        {useCases.map((useCase, index) => (
                            <li key={index} className="flex items-start">
                                <svg
                                    className="w-5 h-5 mr-2 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                {useCase}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
