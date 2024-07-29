'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling
import { cn } from '@/lib/utils';

interface FormulaRendererProps {
    formula: string;
    className?: string;
}

export const FormulaRenderer = ({ formula, className }: FormulaRendererProps) => {
    let sanitizedHtml;
    try {
        // Sanitize the input to prevent XSS attacks
        const sanitizedText = DOMPurify.sanitize(formula);
        sanitizedHtml = (
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]} // Use rehype-raw to process raw HTML within Markdown
            >
                {sanitizedText}
            </ReactMarkdown>
        );
    } catch (error) {
        console.error('Error rendering LaTeX formula:', error);
        sanitizedHtml = 'Error rendering formula';
    }

    return (
        <div className={cn('text-center text-lg', className)}>
            {sanitizedHtml}
        </div>
    );
};
