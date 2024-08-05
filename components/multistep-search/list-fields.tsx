'use client';

import { AI } from '@/lib/actions';
import { useActions, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';
import React from 'react';
import { MultiStepOuput } from '@/components/multistep-search/multistep-ouput';

interface ListFieldsProps {
    summary: {
        fieldName: string;
        description: string;
        useCases: string[];
    };
    category: string; // New prop to receive the selected category
}

// Component to display each field's information
export const ListFields = ({ summary, category }: ListFieldsProps) => {
    const { fieldName, description, useCases } = summary;
    const [_, setMessages] = useUIState<typeof AI>();
    const { multiStepSearchAction } = useActions();

    // The list of fields will disappear or roll up to "See All Fields" after the user selects a field.
    // Once the user selects the field, there will be UI asking if the user wants to see a list of theorems or equations.

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in ">
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
                    <span className="mt-1 text-base text-gray-700">
                        {description}
                    </span>
                </div>
                {/* Applications Section */}
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

            {/* Horizontal line */}
            <hr className="my-4" />

            {/* Options at the footer */}
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    className="w-full sm:w-auto bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:scale-95"
                    onClick={() => {
                        console.log("Show Formulas for:", fieldName); // Placeholder for future action
                    }}
                >
                    Show Formulas
                </button>
                <button
                    className="w-full sm:w-auto bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:scale-95"
                    onClick={() => {
                        console.log("Show Theorems for:", fieldName); // Placeholder for future action
                    }}
                >
                    Show Theorems
                </button>
            </div>

        </div>
    );
};
