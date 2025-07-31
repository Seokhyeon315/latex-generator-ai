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
        <div className="mb-6 animate-slide-up">
            <div
                className="card card-hover cursor-pointer group transition-all duration-300"
                onClick={handleFieldClick}
            >
                <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-primary-900 group-hover:text-accent-700 transition-colors duration-300">
                            {summary.fieldName}
                        </h3>
                        <div className={`w-6 h-6 rounded-full border-2 border-primary-300 flex items-center justify-center transition-all duration-300 ${
                            isExpanded ? 'bg-accent-500 border-accent-500' : 'group-hover:border-accent-500'
                        }`}>
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                isExpanded ? 'bg-white' : 'bg-accent-500 opacity-0 group-hover:opacity-100'
                            }`}></div>
                        </div>
                    </div>
                    
                    <p className="text-base sm:text-lg text-primary-600 mb-6 leading-relaxed">{summary.description}</p>

                    {/* Use Cases */}
                    <div className="mb-6">
                        <div className="bg-primary-50 p-6 rounded-xl border border-primary-200">
                            <h4 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                Common Use Cases
                            </h4>
                            <ul className="space-y-2">
                                {summary.useCases.map((useCase, index) => (
                                    <li key={index} className="flex items-start gap-3 text-primary-700">
                                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="leading-relaxed">{useCase}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Topics */}
                    {isExpanded && (
                        <div className="border-t border-primary-200 pt-6 animate-slide-down">
                            <h4 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                                Select a Topic
                            </h4>
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
        </div>
    );
};
