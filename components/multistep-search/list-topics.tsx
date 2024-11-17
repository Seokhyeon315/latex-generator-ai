'use client';

import React from 'react';
import { toast } from 'sonner';

interface ListTopicsProps {
    category: string;
    field: string;
    topics: string[];
    setLoading: (loading: boolean) => void;
    setSelectedTopic: (topic: string) => void;
    setSelectedField: (field: string) => void;
}

export const ListTopics: React.FC<ListTopicsProps> = ({
    category,
    field,
    topics,
    setLoading,
    setSelectedTopic,
    setSelectedField,
}) => {
    const handleTopicClick = async (topic: string) => {
        try {
            setSelectedTopic(topic);
            setSelectedField(field);
        } catch (error) {
            console.error('Error selecting topic:', error);
            toast.error('Failed to select topic. Please try again.');
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((topic, index) => (
                <div
                    key={index}
                    onClick={() => handleTopicClick(topic)}
                    className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                >
                    <span className="text-gray-700">{topic}</span>
                </div>
            ))}
        </div>
    );
};
