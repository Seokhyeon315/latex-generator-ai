import React from 'react';
import { MemoizedReactMarkdown } from '@/components/markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';
import type { Components } from 'react-markdown';

interface MarkdownRenderProps {
    content: string;
}

const MarkdownRender = React.memo(({ content }: MarkdownRenderProps) => {
    // Replace newline characters and double backslashes in the content
    const formattedText = React.useMemo(() => {
        return content.replace(/\\\\/g, '\\');
    }, [content]);

    const remarkPlugins = React.useMemo(() => [remarkMath, remarkGfm, remarkBreaks], []);
    const rehypePlugins = React.useMemo(() => [rehypeKatex], []);

    const components = React.useMemo((): Components => ({
        // Customize the rendering of paragraph elements
        p: ({ children, ...props }) => {
            return <p className="mb-2 last:mb-0" {...props}>{children}</p>;
        },
    }), []);

    return (
        <div className="prose">
            <MemoizedReactMarkdown
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
                components={components}
            >
                {formattedText}
            </MemoizedReactMarkdown>
        </div>
    );
});

MarkdownRender.displayName = 'MarkdownRender';

export default MarkdownRender;
