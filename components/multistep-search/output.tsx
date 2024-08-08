'use client';

import React from 'react';
import { CopyToClipboard } from '../copy-to-clipboard';
import MarkdownRender from '@/components/markdown-render';

interface OutputProps {
    messages: {
        name: string;
        description: string;
        latexCode: string;
    }[];
    topic: string; // Add topic as a prop
    fieldName?: string; // Add fieldName as a prop
}

export const Output: React.FC<OutputProps> = ({ messages, topic, fieldName }) => {
    return (
        <div className="space-y-6 px-4 sm:px-0"> {/* Add padding for smaller screens */}
            {/* Display the context message */}
            <div className="bg-gray-900 text-cyan-300 p-4 rounded-md shadow-lg">
                <p className="text-lg font-medium text-center">
                    Here are the results based on your selection:{' '}
                    <span className="font-semibold underline">{topic}</span>{' '}

                </p>
            </div>

            {/* Vertical spacing between cards */}
            {messages.map((message, index) => (
                <div
                    key={index}
                    className="flex flex-col items-start p-4 bg-white rounded-md shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-800">{message.name}</h2>

                    {/* Rendered Version */}
                    <div className="mt-2 w-full bg-gray-100 p-2">
                        <MarkdownRender content={message.latexCode} />
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mt-3">
                        < MarkdownRender content={message.description} /></p>

                    {/* LaTeX Code and Copy to Clipboard */}
                    <div className="mt-4 p-4 bg-gray-100 rounded-md w-full flex items-center justify-between">
                        <code className="block text-sm text-gray-900 whitespace-pre-wrap overflow-auto">
                            {message.latexCode.replace(/\\n/g, '\n').replace(/\\\\/g, '\\')}
                        </code>
                        <CopyToClipboard text={message.latexCode.replace(/\\n/g, '\n').replace(/\\\\/g, '\\')} />
                    </div>
                </div>
            ))}
        </div>
    );
};
