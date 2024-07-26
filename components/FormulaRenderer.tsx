import React from 'react';
import katex from 'katex';
import Latex from 'react-latex-next'

import 'katex/dist/katex.min.css';

const FormulaRenderer = ({ formula }: { formula: string }) => {
    let html;
    try {
        html = katex.renderToString(formula, { throwOnError: false });
    } catch (error) {
        console.error('Error rendering LaTeX formula:', error);
        html = 'Error rendering formula';
    }

    return (
        <div className="text-center">
            <Latex>{html}</Latex>
        </div>
    );
};

export default FormulaRenderer;
