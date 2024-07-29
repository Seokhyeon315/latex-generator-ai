// components/MarkdownRender.tsx
import React from 'react';
import { MemoizedReactMarkdown } from '@/components/markdown';
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import { StreamableValue } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import rehypeKatex from 'rehype-katex';


export default function MarkdownRender({ content }: { content: string | StreamableValue<string> }) {
    const text = useStreamableText(content)
    const formattedText = text.replace(/\\n/g, '\n').replace(/\\\\/g, '\\')

    return (
        <MemoizedReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            className="prose"
            components={{
                p({ children }) {
                    return <p className="mb-2 last:mb-0">{children}</p>
                },

            }}
        >
            {formattedText}
        </MemoizedReactMarkdown>
    )

}

