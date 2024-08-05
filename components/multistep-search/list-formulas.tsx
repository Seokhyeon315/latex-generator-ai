'use client';

import React from 'react';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import { AI } from '@/lib/actions';

interface ListFormulasProps {
    summary: {
        formulaName: string;
        description: string;
        latexCode: string;
    };
}

// Component to display each field's information
export const ListFormulas = ({ summary }: ListFormulasProps) => {
    const [aiState] = useAIState()
    const [messages, setMessages] = useUIState<typeof AI>()
    const { formulaName, description, latexCode } = summary;
    const { multiStepSearchAction } = useActions();

    const handleFieldClick = async () => {
        try {
            // Trigger the server action with the field's information

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
                        Name
                    </span>
                    <span className="mt-1 text-lg font-bold text-gray-900">
                        {formulaName}
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
            </div>
        </div>
    );
};
