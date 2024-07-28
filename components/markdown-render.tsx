// components/MarkdownRender.tsx
import React from 'react';
import markdownit from 'markdown-it';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS for styling
import katex from 'katex';

type Props = {
    text: string;
};

// Initialize markdown-it
const md = markdownit({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
});

// Function to render KaTeX within Markdown
function renderKatex(content: string) {
    // Replace block math first to avoid conflict with inline math
    content = content.replace(/\$\$([^$]+)\$\$/g, (_, equation) => {
        return katex.renderToString(equation, {
            throwOnError: false,
            displayMode: true
        });
    });

    // Replace inline math
    content = content.replace(/\$([^$]+)\$/g, (_, equation) => {
        return katex.renderToString(equation, {
            throwOnError: false
        });
    });

    return content;
}

const MarkdownRender = ({ text }: Props) => {
    // Replace escaped newlines with actual newlines
    const formattedText = text.replace(/\\n/g, '\n');

    // Render the Markdown content using markdown-it
    let htmlContent = md.render(formattedText);

    // Render KaTeX expressions within the HTML content
    htmlContent = renderKatex(htmlContent);

    // Sanitize the HTML content to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(htmlContent);

    return (
        <div
            className="prose prose-lg"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
};

export default MarkdownRender;
