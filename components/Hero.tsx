'use client';

import { Button } from "@/components/ui/button"
import React from "react"
import Link from "next/link"
import { Search, Sparkle, UserIcon, ArrowRight, Star, TrendingUp } from "./ui/icons"

const HeroSection = React.memo(() => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50/30 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-200/20 to-primary-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            
            <div className="relative section-padding content-padding flex flex-col items-center justify-center min-h-screen">
                {/* Hero Content */}
                <section className="text-center w-full max-w-5xl mb-16 animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-8 animate-slide-down">
                        <Star size={16} className="text-primary-500" />
                        Trusted by 10,000+ researchers worldwide
                        <TrendingUp size={16} className="text-primary-500" />
                    </div>

                    <h1 className="text-gradient mb-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
                        STEM Hub
                    </h1>
                    <p className="text-xl sm:text-2xl text-surface-600 max-w-3xl mx-auto leading-relaxed mb-10 animate-slide-up" style={{animationDelay: '0.2s'}}>
                        Your comprehensive platform for STEM education and research. 
                        <span className="text-primary-600 font-semibold"> Discover, learn, and excel</span> with 
                        AI-powered tools designed for modern academics.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{animationDelay: '0.3s'}}>
                        <Link href="/search" className="group">
                            <Button size="lg" className="btn btn-primary text-lg px-8 py-4 h-auto group-hover:scale-105 transition-transform duration-200">
                                Get Started
                                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                            </Button>
                        </Link>

                        <Link href="/about" className="group">
                            <Button size="lg" variant="outline" className="btn btn-outline text-lg px-8 py-4 h-auto">
                                Learn More
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 animate-slide-up" style={{animationDelay: '0.4s'}}>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                            <div className="text-surface-600 text-sm">Curated Formulas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-secondary-600 mb-2">3</div>
                            <div className="text-surface-600 text-sm">STEM Domains</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-accent-600 mb-2">99.9%</div>
                            <div className="text-surface-600 text-sm">Accuracy Rate</div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="w-full max-w-6xl animate-fade-in" style={{animationDelay: '0.5s'}}>
                    <div className="text-center mb-16">
                        <h2 className="text-surface-900 mb-4">Why Choose STEM Hub</h2>
                        <p className="text-xl text-surface-600 max-w-3xl mx-auto leading-relaxed">
                            Streamline your academic workflow with cutting-edge tools designed for modern researchers, 
                            students, and educators who demand excellence.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Search Feature */}
                        <div className="group card card-hover p-8 text-center animate-slide-up" style={{animationDelay: '0.6s'}}>
                            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110">
                                <Search className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-surface-900 mb-4">Instant Formula Search</h3>
                            <p className="text-surface-600 leading-relaxed text-lg">
                                Find any formula or theorem instantly with our intelligent search engine. 
                                No more digging through textbooks or endless scrolling through resources.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <div className="inline-flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                                    Try it now
                                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </div>
                        </div>

                        {/* User Experience */}
                        <div className="group card card-hover p-8 text-center animate-slide-up" style={{animationDelay: '0.7s'}}>
                            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110">
                                <UserIcon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-surface-900 mb-4">Intuitive Interface</h3>
                            <p className="text-surface-600 leading-relaxed text-lg">
                                Clean, responsive design that works seamlessly across all devices. 
                                Built for researchers, by researchers, with attention to every detail.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <div className="inline-flex items-center text-accent-600 font-medium group-hover:text-accent-700 transition-colors">
                                    Explore interface
                                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </div>
                        </div>

                        {/* AI-Powered */}
                        <div className="group card card-hover p-8 text-center animate-slide-up" style={{animationDelay: '0.8s'}}>
                            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110">
                                <Sparkle className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-surface-900 mb-4">AI-Powered Precision</h3>
                            <p className="text-surface-600 leading-relaxed text-lg">
                                Powered by advanced AI models to deliver accurate results, complete with 
                                LaTeX code, detailed explanations, and academic references.
                            </p>
                            <div className="mt-6 flex justify-center">
                                <div className="inline-flex items-center text-secondary-600 font-medium group-hover:text-secondary-700 transition-colors">
                                    Learn about AI
                                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16 animate-slide-up" style={{animationDelay: '0.9s'}}>
                        <div className="glass-card p-8 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-semibold text-surface-900 mb-4">
                                Ready to accelerate your research?
                            </h3>
                            <p className="text-surface-600 mb-6 text-lg">
                                Join thousands of researchers and students who trust STEM Hub for their academic needs.
                            </p>
                            <Link href="/search">
                                <Button className="btn btn-primary text-lg px-8 py-4 h-auto group hover:scale-105 transition-transform duration-200">
                                    Start Exploring
                                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;




