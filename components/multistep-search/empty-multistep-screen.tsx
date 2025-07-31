'use client'

import { GitBranch, ChevronRight, BookOpen, Zap } from 'lucide-react';

export function EmptyMultistepScreen() {
    return (
        <div className="mx-auto max-w-2xl px-4 animate-fade-in">
            <div className="card p-8 sm:p-10 text-center">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-primary-900 rounded-2xl flex items-center justify-center shadow-large">
                            <GitBranch className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
                        Multistep Search
                    </h1>
                    <p className="text-lg sm:text-xl text-primary-600 leading-relaxed max-w-lg mx-auto">
                        Discover formulas through guided exploration of STEM categories
                    </p>
                </div>

                {/* Step-by-step Process */}
                <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-4 p-4 glass-card text-left">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-sm">1</span>
                        </div>
                        <span className="text-primary-700 font-medium">Select a category from Math, Science, or Engineering</span>
                        <ChevronRight className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-4 p-4 glass-card text-left">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center">
                            <span className="text-primary-700 font-bold text-sm">2</span>
                        </div>
                        <span className="text-primary-700 font-medium">Choose a specific field within your selected category</span>
                        <ChevronRight className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-4 p-4 glass-card text-left">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-300 rounded-full flex items-center justify-center">
                            <span className="text-primary-800 font-bold text-sm">3</span>
                        </div>
                        <span className="text-primary-700 font-medium">Select a topic to explore formulas and theorems</span>
                        <BookOpen className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-4 p-4 glass-card text-left">
                        <div className="flex-shrink-0 w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                            <Zap className="w-4 h-4 text-accent-600" />
                        </div>
                        <span className="text-primary-700 font-medium">View curated results with comprehensive explanations</span>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-primary-50 p-6 rounded-xl border border-primary-200">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                        <span className="text-sm font-medium text-primary-700">Perfect For</span>
                    </div>
                    <p className="text-sm text-primary-700 leading-relaxed">
                        Students and researchers who want to explore STEM concepts systematically and discover related formulas through guided navigation
                    </p>
                </div>
            </div>
        </div>
    )
}
