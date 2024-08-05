'use client'

import { useActions, useUIState } from 'ai/rsc'
import React from 'react'

export const Formulas = ({ formulas }: { formulas: string[] }) => {
    const { multiStepSearchAction } = useActions()
    const [_, setMessages] = useUIState()

    return (
        <div className="grid gap-4">
            <p>
                Here is a list of formulas based on your selected field and category.
                Choose one to get LaTeX Code.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-2">
                {formulas.map(formula => (
                    <button
                        className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer"
                        key={formula}
                        onClick={async () => {
                            const response = await multiStepSearchAction(
                                `Give me the LaTeX code of ${formula}.`
                            )
                            setMessages((currentMessages: any[]) => [
                                ...currentMessages,
                                response
                            ])
                        }}
                    >
                        {formula}
                    </button>
                ))}
            </div>
        </div>
    )
}
