'use client'

import React from 'react'

export function EmptyDirectScreen() {
    return (
        <div className="mx-auto max-w-2xl px-4 ">
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-8 shadow-md text-base">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Direct Search Guide</h1>

                <div className="leading-relaxed text-gray-700">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">How to Use:</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Enter the name of the formula, equation, or theorem in the search bar.</li>
                            <li>Press the search button or hit Enter to initiate the search.</li>
                            <li>Review the output, which includes the formula name, description, rendered version, usage, and LaTeX code.</li>
                            <li>Use the copy button to save the LaTeX code to your clipboard if needed.</li>
                        </ol>
                    </div>
                    <p className="mt-4 text-gray-600 italic">
                        Note: Ensure you have a specific formula name for the best results. General queries may not return accurate results.
                    </p>
                </div>
            </div>
        </div>
    )
}
