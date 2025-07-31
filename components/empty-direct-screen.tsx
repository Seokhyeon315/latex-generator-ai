'use client'

import { Target, Search, BookOpen, Copy } from 'lucide-react';

export function EmptyDirectScreen() {
    return (
        <div className="mx-auto max-w-2xl px-4 animate-fade-in">
            <div className="card p-8 sm:p-10 text-center">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-primary-900 rounded-2xl flex items-center justify-center shadow-large">
                            <Target className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
                        Direct Search
                    </h1>
                    <p className="text-lg sm:text-xl text-primary-600 leading-relaxed max-w-lg mx-auto">
                        Find specific formulas and theorems with precision and speed
                    </p>
                </div>

                {/* Feature Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="glass-card p-6 text-left">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Search className="w-4 h-4 text-primary-600" />
                            </div>
                            <h3 className="font-semibold text-primary-900">1. Search</h3>
                        </div>
                        <p className="text-sm text-primary-600">
                            Enter the exact name of the formula, equation, or theorem you're looking for
                        </p>
                    </div>

                    <div className="glass-card p-6 text-left">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-primary-200 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-primary-700" />
                            </div>
                            <h3 className="font-semibold text-primary-900">2. Review</h3>
                        </div>
                        <p className="text-sm text-primary-600">
                            Get comprehensive details including formula, explanation, usage, and academic references
                        </p>
                    </div>

                    <div className="glass-card p-6 text-left sm:col-span-2">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-primary-300 rounded-lg flex items-center justify-center">
                                <Copy className="w-4 h-4 text-primary-800" />
                            </div>
                            <h3 className="font-semibold text-primary-900">3. Copy & Use</h3>
                        </div>
                        <p className="text-sm text-primary-600">
                            Copy the LaTeX code directly to your clipboard for immediate use in your projects
                        </p>
                    </div>
                </div>

                {/* Pro Tip */}
                <div className="bg-primary-50 p-6 rounded-xl border border-primary-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                        <span className="text-sm font-medium text-primary-700">Pro Tip</span>
                    </div>
                    <p className="text-sm text-primary-700 leading-relaxed">
                        Be specific with formula names for best results. Try "Pythagorean theorem", "Newton's second law", or "Euler's formula"
                    </p>
                </div>
            </div>
        </div>
    )
}
