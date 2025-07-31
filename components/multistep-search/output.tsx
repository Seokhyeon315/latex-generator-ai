'use client';

import { CopyToClipboard } from '../copy-to-clipboard';
import MarkdownRender from '@/components/markdown-render';

interface Formula {
    name: string;
    description: string;
    latexCode: string;
}

interface OutputProps {
    messages: Formula[];
    topic: string;
    fieldName?: string;
}

export const Output: React.FC<OutputProps> = ({ messages, topic, fieldName }) => {
    return (
        <div className="space-y-6 px-4 sm:px-0">
            {/* Display the context message */}
            <div className="bg-gray-900 text-cyan-300 p-4 rounded-md shadow-lg">
                <p className="text-lg font-medium text-center">
                    Here are the results based on your selection:{' '}
                    <span className="lowercase">{topic}</span> in{' '}
                    <span className='lowercase'>{fieldName} field.</span>
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
                    {message.latexCode && message.latexCode !== 'None' && message.latexCode !== 'N/A' && (
                        <div className="mt-2 w-full bg-gray-50 p-2 overflow-x-auto">
                            <div className="max-w-full">
                                <MarkdownRender content={message.latexCode} />
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 mt-3">
                        <MarkdownRender content={message.description} />
                    </p>

                    {/* LaTeX Code and Copy to Clipboard */}
                    {message.latexCode && message.latexCode !== 'None' && message.latexCode !== 'N/A' && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-md w-full flex flex-row items-start">
                            <code className="block text-sm text-gray-900 whitespace-pre-wrap overflow-auto w-full">
                                {message.latexCode.replace(/\\\\/g, '\\')}
                            </code>
                            <CopyToClipboard text={message.latexCode.replace(/\\\\/g, '\\')} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
