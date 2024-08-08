import React from 'react';
import { MemoizedReactMarkdown } from '@/components/markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useStreamableText } from '@/lib/hooks/use-streamable-text';
import rehypeKatex from 'rehype-katex';

export default function MarkdownRender({ content }: { content: string }) {
    // Use the useStreamableText hook to process the content
    const text = useStreamableText(content);

    // Replace newline characters and double backslashes in the text
    const formattedText = text.replace(/\\\\/g, '\\');

    return (
        <MemoizedReactMarkdown
            // Add remark-breaks to the list of remark plugins
            remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeKatex]}
            className="prose"
            components={{
                // Customize the rendering of paragraph elements
                p({ children }) {
                    return <p className="mb-2 last:mb-0">{children}</p>;
                },
            }}
        >
            {formattedText}
        </MemoizedReactMarkdown>
    );
}
