import React from 'react'

export function EmptyScreen() {
    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-sm sm:text-base">
                <h1 className="text-2xl sm:text-3xl tracking-tight font-semibold max-w-fit inline-block">
                    Welcome to Pro Formula
                </h1>
                <p className="leading-normal text-zinc-900">
                    This is an open source AI chatbot app template built with{' '}
                    <a href="https://nextjs.org">Next.js</a>, the{' '}
                    <a href="https://sdk.vercel.ai">
                        Vercel AI SDK
                    </a>
                    , and{' '}
                    <a href="https://ai.google.dev">
                        Google Gemini
                    </a>
                    .
                </p>
                <p className="leading-normal text-zinc-900">
                    It uses{' '}
                    <a href="https://vercel.com/blog/ai-sdk-3-generative-ui">
                        React Server Components
                    </a>{' '}
                    with function calling to mix both text with generative UI responses
                    from Gemini. The UI state is synced through the AI SDK so the model is
                    always aware of your stateful interactions as they happen in the
                    browser.
                </p>
            </div>
        </div>
    )
}
