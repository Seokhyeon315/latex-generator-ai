import { StreamableValue } from 'ai/rsc'
import { MemoizedReactMarkdown } from '@/components/markdown';
import { User } from 'lucide-react'
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import React from 'react'
import { cn } from '@/lib/utils';
import { useStreamableText } from '@/lib/hooks/use-streamable-text';

export function UserMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="group relative flex items-start md:-ml-12">
            <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border shadow-sm">
                <User />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
                {children}
            </div>
        </div>
    )
}


export function BotMessage({
    content,
    className
}: {
    content: string | StreamableValue<string>
    className?: string
}) {
    const text = useStreamableText(content)

    return (
        <div className={cn('group relative flex items-start md:-ml-12', className)}>
            <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border shadow-sm">
                <img className="size-6" src="/images/gemini.png" alt="gemini logo" />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                <MemoizedReactMarkdown
                    className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                        p({ children }) {
                            return <p className="mb-2 last:mb-0">{children}</p>
                        },

                    }}
                >
                    {text}
                </MemoizedReactMarkdown>
            </div>
        </div>
    )
}


export function BotCard({
    children,
    showAvatar = true
}: {
    children: React.ReactNode
    showAvatar?: boolean
}) {
    return (
        <div className="group relative flex items-start md:-ml-12">
            <div
                className={cn(
                    'bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-lg border shadow-sm',
                    !showAvatar && 'invisible'
                )}
            >
                <img className="size-6" src="/images/gemini.png" alt="gemini logo" />
            </div>
            <div className="ml-4 flex-1 pl-2">{children}</div>
        </div>
    )
}