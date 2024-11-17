'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';

interface FormulaRendererProps {
    formula: string;
    className?: string;
}

export const FormulaRenderer = ({ formula, className }: FormulaRendererProps) => {
    const cleanLatex = (tex: string) => {
        // Remove any existing $$ and whitespace
        let cleaned = tex.replace(/^\$\$|\$\$$/g, '').trim();

        // Fix common LaTeX issues
        cleaned = cleaned
            // Fix backslashes
            .replace(/\\\\/g, '\\')
            // Fix braces
            .replace(/\}\}/g, '}')
            .replace(/\{\{/g, '{')
            // Fix text commands - handle text content more carefully
            .replace(/\\text\{([^}]*)\}/g, (match, content) => {
                // Replace parentheses in text with escaped versions
                return `\\text{${content.replace(/[()]/g, '\\$&')}}`;
            })
            // Fix vectors
            .replace(/\\vec{([^}]*)}/g, '\\mathbf{$1}')
            // Fix dots
            .replace(/\\dot{([^}]*)}/g, '\\dot{$1}')
            // Fix fractions
            .replace(/\\frac(?!\{)/g, '\\frac{')
            // Fix matrices
            .replace(/\\begin{([^}]*)}/g, '\\begin{$1}')
            .replace(/\\end{([^}]*)}/g, '\\end{$1}')
            // Fix common commands
            .replace(/\\left\(/g, '(')
            .replace(/\\right\)/g, ')')
            .replace(/\\left\{/g, '\\{')
            .replace(/\\right\}/g, '\\}')
            // Fix subscripts and superscripts
            .replace(/([^\\])_([a-zA-Z0-9])(?![{])/g, '$1_{$2}')
            .replace(/([^\\])\^([a-zA-Z0-9])(?![{])/g, '$1^{$2}')
            // Fix spacing
            .replace(/\s+/g, ' ')
            .trim();

        // Ensure formula is wrapped in $$
        return cleaned.startsWith('$$') ? cleaned : `$$${cleaned}$$`;
    };

    const renderFormula = (tex: string) => {
        try {
            const cleanedFormula = cleanLatex(tex);
            const sanitizedText = DOMPurify.sanitize(cleanedFormula);

            return (
                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[
                        [rehypeKatex, {
                            strict: false,
                            trust: true,
                            throwOnError: false,
                            errorColor: '#ff0000',
                            macros: {
                                "\\vec": "\\mathbf",
                                "\\f": "f(#1)",
                                "\\dot": "\\dot{#1}",
                                "\\text": "\\text{#1}",
                                "\\matrix": "\\begin{matrix}#1\\end{matrix}",
                                "\\pmatrix": "\\begin{pmatrix}#1\\end{pmatrix}"
                            }
                        }],
                        rehypeRaw
                    ]}
                >
                    {sanitizedText}
                </ReactMarkdown>
            );
        } catch (error) {
            console.error('Error rendering LaTeX:', error);
            return (
                <div className="font-mono text-sm p-2 bg-gray-50 rounded">
                    <code>{formula.replace(/\$\$/g, '')}</code>
                </div>
            );
        }
    };

    return (
        <div className={cn('text-lg text-center overflow-x-auto', className)}>
            {renderFormula(formula)}
        </div>
    );
};
