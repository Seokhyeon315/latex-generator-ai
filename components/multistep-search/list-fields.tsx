'use client';

import React, { useState } from 'react';
import { ListTopics } from '@/components/multistep-search/list-topics';

interface ListFieldsProps {
    summary: {
        fieldName: string;
        description: string;
        useCases: string[];
        topics: string[];
    };
    category: string;
    setLoading: (loading: boolean) => void;
    setSelectedTopic: (topic: string) => void;
    setSelectedField: (field: string) => void;
}

export const ListFields: React.FC<ListFieldsProps> = ({
    summary,
    category,
    setLoading,
    setSelectedTopic,
    setSelectedField,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFieldClick = () => {
        try {
            setIsExpanded(!isExpanded);
            if (!isExpanded) {
                setSelectedField(summary.fieldName);
            }
        } catch (error) {
            console.error('Error handling field click:', error);
        }
    };

    return (
        <div className="mb-4">
            <div
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={handleFieldClick}
            >
                <h3 className="text-xl font-semibold mb-2">{summary.fieldName}</h3>
                <p className="text-gray-600 mb-4">{summary.description}</p>

                {/* Use Cases */}
                <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Common Use Cases:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                        {summary.useCases.map((useCase, index) => (
                            <li key={index}>{useCase}</li>
                        ))}
                    </ul>
                </div>

                {/* Topics */}
                {isExpanded && (
                    <div className="mt-4 border-t pt-4">
                        <ListTopics
                            category={category}
                            field={summary.fieldName}
                            topics={summary.topics}
                            setLoading={setLoading}
                            setSelectedTopic={setSelectedTopic}
                            setSelectedField={setSelectedField}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
