'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown'; // Import a markdown renderer
import remarkGfm from 'remark-gfm'; // For GitHub-flavored markdown

// Define the expected structure of a message based on your UIState
interface Message {
    id?: string;
    role: 'user' | 'assistant';
    content: string; // Add content here for rendering
    display?: React.ReactNode;
}

interface MultiStepOutputProps {
    messages: Message[]; // Use the Message type
}

export const MultiStepOuput = ({ messages }: MultiStepOutputProps) => {
    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
            {messages.map((message, idx) => (
                <div
                    key={idx}
                    className={`p-4 mb-4 bg-gray-50 rounded-lg border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1 ${message.role === 'user' ? 'bg-blue-50' : 'bg-green-50'
                        }`}
                >
                    {/* Render message content with markdown */}
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};
