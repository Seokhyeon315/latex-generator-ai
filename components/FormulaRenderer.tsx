'use client';

import React from 'react';
import katex from 'katex';
import DOMPurify from 'dompurify';
import { cn } from '@/lib/utils';

interface FormulaRendererProps {
    formula: string;
    className?: string;
}

export const FormulaRenderer = ({ formula, className }: FormulaRendererProps) => {
    const cleanLatex = (tex: string) => {
        if (!tex) return tex;

        // Remove outer $$ and whitespace
        let cleaned = tex.replace(/^\$\$|\$\$$/g, '').trim();

        // Handle special cases
        if (cleaned.includes('\\begin{aligned}')) {
            return cleaned;
        }

        // Fix common LaTeX issues
        cleaned = cleaned
            // Fix backslashes
            .replace(/\\\\/g, '\\')
            // Fix braces
            .replace(/\}\}/g, '}')
            .replace(/\{\{/g, '{')
            // Fix text commands
            .replace(/\\text\{([^}]*)\}/g, '\\text{$1}')
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

        return cleaned;
    };

    try {
        const cleanedFormula = cleanLatex(formula);
        const sanitizedText = DOMPurify.sanitize(cleanedFormula);

        const html = katex.renderToString(sanitizedText, {
            displayMode: true,
            throwOnError: false,
            errorColor: '#ff0000',
            trust: true,
            strict: false,
            macros: {
                "\\vec": "\\mathbf",
                "\\f": "f(#1)",
                "\\dot": "\\dot{#1}",
                "\\text": "\\text{#1}"
            }
        });

        return (
            <div
                className={cn("overflow-x-auto katex-display", className)}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    } catch (error) {
        console.error('Error rendering LaTeX:', error);
        return (
            <div className="font-mono text-sm p-2 bg-gray-50 rounded">
                <code>{formula}</code>
            </div>
        );
    }
};
