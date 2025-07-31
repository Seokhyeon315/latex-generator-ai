'use client';

import { CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Search as SearchIcon, GitBranch, ArrowRight, Zap, Target } from './ui/icons';

export function Search() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50/30 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-accent-200/30 to-primary-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
            
            <div className="relative section-padding content-padding">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-8">
                            <SearchIcon size={16} className="text-primary-500" />
                            Choose your search method
                            <Zap size={16} className="text-primary-500" />
                        </div>
                        
                        <h1 className="text-gradient mb-6">
                            Formula Search
                        </h1>
                        <p className="text-xl sm:text-2xl text-surface-600 max-w-4xl mx-auto leading-relaxed">
                            Quickly find and access the LaTeX code for a wide range of formulas and theorems. 
                            <span className="text-primary-600 font-semibold"> Choose your preferred search method</span> below.
                        </p>
                    </div>

                    {/* Search Methods Comparison */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-stretch mb-16">
                        {/* Direct Search */}
                        <Link href="/search/direct-search" className="group animate-slide-up" style={{animationDelay: '0.2s'}}>
                            <div className="card card-hover h-full p-8 relative overflow-hidden group-hover:border-primary-300 transition-all duration-300">
                                {/* Card Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-primary-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-large group-hover:scale-110 transition-all duration-300">
                                            <Target className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-surface-900 group-hover:text-primary-700 transition-colors duration-300">
                                                Direct Search
                                            </CardTitle>
                                            <div className="text-sm text-primary-600 font-medium">Perfect for targeted searches</div>
                                        </div>
                                    </div>
                                    
                                    <CardContent className="space-y-4">
                                        <p className="text-surface-600 leading-relaxed text-lg">
                                            Ideal for those who already know the specific formula or theorem they are looking for.
                                        </p>
                                        <p className="text-surface-600 leading-relaxed">
                                            Retrieve rendered version, detailed descriptions, applications, and the corresponding LaTeX code with ease.
                                        </p>
                                        
                                        {/* Features List */}
                                        <div className="pt-4 space-y-2">
                                            <div className="flex items-center text-sm text-surface-600">
                                                <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                                                Instant results for known formulas
                                            </div>
                                            <div className="flex items-center text-sm text-surface-600">
                                                <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                                                Complete LaTeX code and explanations
                                            </div>
                                            <div className="flex items-center text-sm text-surface-600">
                                                <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                                                Academic references included
                                            </div>
                                        </div>

                                        <div className="pt-4 flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                                            Start direct search
                                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Link>

                        {/* VS Divider */}
                        <div className="flex items-center justify-center animate-scale-in" style={{animationDelay: '0.4s'}}>
                            <div className="glass-card px-6 py-4 text-center">
                                <div className="text-2xl font-bold text-gradient mb-2">VS</div>
                                <div className="text-sm text-surface-500">Choose your approach</div>
                            </div>
                        </div>

                        {/* Multistep Search */}
                        <Link href="/search/multistep-search" className="group animate-slide-up" style={{animationDelay: '0.6s'}}>
                            <div className="card card-hover h-full p-8 relative overflow-hidden group-hover:border-secondary-300 transition-all duration-300">
                                {/* Card Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/50 to-secondary-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-large group-hover:scale-110 transition-all duration-300">
                                            <GitBranch className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-surface-900 group-hover:text-secondary-700 transition-colors duration-300">
                                                Multistep Search
                                            </CardTitle>
                                            <div className="text-sm text-secondary-600 font-medium">Guided discovery process</div>
                                        </div>
                                    </div>
                                    
                                    <CardContent className="space-y-4">
                                        <p className="text-surface-600 leading-relaxed text-lg">
                                            Designed for users who need assistance in narrowing down potential formulas or theorems.
                                        </p>
                                        <p className="text-surface-600 leading-relaxed">
                                            Step through a guided process to find the most relevant formulas or theorems, including comprehensive descriptions and LaTeX codes.
                                        </p>
                                        
                                        {/* Features List */}
                                        <div className="pt-4 space-y-2">
                                            <div className="flex items-center text-sm text-surface-600">
                                                <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></div>
                                                Browse by STEM categories
                                            </div>
                                            <div className="flex items-center text-sm text-surface-600">
                                                <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></div>
                                                Step-by-step guided discovery
                                            </div>
                                            <div className="flex items-center text-sm text-surface-600">
                                                <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></div>
                                                Multiple related formulas
                                            </div>
                                        </div>

                                        <div className="pt-4 flex items-center text-secondary-600 font-medium group-hover:text-secondary-700 transition-colors">
                                            Start guided search
                                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="text-center animate-slide-up" style={{animationDelay: '0.8s'}}>
                        <div className="glass-card p-8 max-w-3xl mx-auto">
                            <h3 className="text-2xl font-semibold text-surface-900 mb-4">
                                Not sure which method to choose?
                            </h3>
                            <p className="text-surface-600 mb-6 text-lg leading-relaxed">
                                <span className="font-semibold text-primary-600">Direct Search</span> is perfect when you know exactly what you're looking for. 
                                <span className="font-semibold text-secondary-600"> Multistep Search</span> helps you discover formulas by exploring categories and topics.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/search/direct-search">
                                    <Button className="btn btn-primary px-6 py-3 group">
                                        Try Direct Search
                                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                    </Button>
                                </Link>
                                <Link href="/search/multistep-search">
                                    <Button className="btn btn-secondary px-6 py-3 group">
                                        Browse Categories
                                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
