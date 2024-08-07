'use client'

import React from 'react';

interface ListTopicsProps {
    category: string;
    field: string;
    topics: string[];
}

const ListTopics: React.FC<ListTopicsProps> = ({ category, field, topics }) => {
    return (
        <div className="mt-4 transition-all duration-300 ease-in-out">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Topics
            </span>
            <div className="mt-2 space-y-2">
                {topics.map((topic, index) => (
                    <div
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

export default ListTopics;
