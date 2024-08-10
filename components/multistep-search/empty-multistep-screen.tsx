'use client'

import React from 'react'

export function EmptyMultistepScreen() {
    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-lg text-base">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                    Multistep Search Guide
                </h1>

                <div className="leading-relaxed text-gray-700">
                    <div className="bg-gray-50 p-5 rounded-lg mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                            How to Use:
                        </h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>
                                Select a category from Math, Science, or Engineering.
                            </li>
                            <li>
                                Choose a specific field of interest within your selected category.
                            </li>
                            <li>
                                Decide whether you want to explore theorems or equations in the chosen field.
                            </li>
                            <li>
                                View the results powered by Gemini AI, tailored to your selections.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}
