// components/FormulaRenderer.tsx
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling

interface FormulaRendererProps {
    formula: string;
}

export const FormulaRenderer: React.FC<FormulaRendererProps> = ({ formula }) => {
    let sanitizedHtml;
    try {
        // Sanitize the input to prevent XSS attacks
        const sanitizedText = DOMPurify.sanitize(formula);
        sanitizedHtml = (
            <ReactMarkdown
                children={sanitizedText}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]} // Use rehype-raw to process raw HTML within Markdown
            />
        );
    } catch (error) {
        console.error('Error rendering LaTeX formula:', error);
        sanitizedHtml = 'Error rendering formula';
    }

    return (
        <div className="text-center">
            <span className="text-xl">
                {sanitizedHtml}
            </span>
        </div>
    );
};
