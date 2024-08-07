'use client';

import React from 'react';
import { useUIState, useActions } from 'ai/rsc';

interface ListTopicsProps {
    category: string;
    field: string;
    topics: string[];
    setLoading: (loading: boolean) => void;
}

export const ListTopics: React.FC<ListTopicsProps> = ({ category, field, topics, setLoading }) => {
    const submitInputAction = useActions().submitInputAction; // Corrected to use destructuring properly
    const [_, setMessages] = useUIState();

    const handleTopicClick = async (topic: string) => {
        setLoading(true); // Start loading when a topic is clicked
        try {
            const { formulas } = await submitInputAction(
                `Give me the list of 10 formulas, equations, or theorems of ${topic}, ${field}, in the category of ${category}.`
            );

            // Add received formulas to the message state
            setMessages((currentMessages: any) => [
                ...currentMessages,
                ...formulas.map((formula: any) => ({
                    name: formula.name,
                    description: formula.description,
                    latexCode: formula.latexCode,
                })),
            ]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Stop loading after the response
        }
    };

    return (
        <div className="mt-4 transition-all duration-300 ease-in-out">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Topics
            </span>
            <div className="mt-2 space-y-2">
                {topics.map((topic, index) => (
                    <div
                        onClick={() => handleTopicClick(topic)}
                        key={index}
                        className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 transition-transform duration-200 hover:shadow-lg hover:scale-105"
                    >
                        <span className="text-gray-800 font-medium">{topic}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
