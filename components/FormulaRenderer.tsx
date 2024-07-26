// components/FormulaRenderer.tsx
'use client';

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface FormulaRendererProps {
    formula: string;
}


export const FormulaRenderer: React.FC<FormulaRendererProps> = ({ formula }) => {
    let html;
    try {
        html = katex.renderToString(formula, { throwOnError: false });
    } catch (error) {
        console.error('Error rendering LaTeX formula:', error);
        html = 'Error rendering formula';
    }

    return (
        <div className="text-center">
            <span dangerouslySetInnerHTML={{ __html: html }} className="text-xl" />
        </div>
    );
};


interface ExplanationRendererProps {
    explanation: string;
    usage: string;
}

const renderTextWithLatex = (text: string) => {
    return text.split('$').map((part, index) => {
        if (index % 2 !== 0) {
            // Render LaTeX part using KaTeX
            try {
                return <span key={index} dangerouslySetInnerHTML={{ __html: katex.renderToString(part.trim(), { throwOnError: false }) }} />;
            } catch (error) {
                console.error('Error rendering LaTeX part:', error);
                return <span key={index} style={{ color: 'red' }}>Error rendering LaTeX part</span>;
            }
        }
        // Render plain text part
        return <span key={index}>{part}</span>;
    });
};

const renderFormattedText = (text: string) => {
    return text.split('\\n').map((line, index) => {
        if (line.startsWith('* ')) {
            const content = line.substring(2).split('**');
            return (
                <div key={index} className="ml-4 list-disc">
                    {content.map((part, idx) => (
                        idx % 2 === 1 ? <strong key={idx}>{part}</strong> : <span key={idx}>{part}</span>
                    ))}
                </div>
            );
        } else {
            return <p key={index}>{renderTextWithLatex(line)}</p>;
        }
    });
};

export const ExplanationRenderer: React.FC<ExplanationRendererProps> = ({ explanation, usage }) => {
    return (
        <div className="text-base text-left">
            {/* <h3 className="font-bold">Explanation:</h3>
            {renderFormattedText(explanation)} */}
            <h3 className="font-bold bt-4">Usage:</h3>
            {renderFormattedText(usage)}
        </div>
    );
};


