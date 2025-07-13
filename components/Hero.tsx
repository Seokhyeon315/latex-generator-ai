'use client';

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, Sparkle, UserIcon } from "./ui/icons"
import React from "react"

const HeroSection = React.memo(() => {
    return (
        <div className="py-20 lg:py-24 px-4 flex flex-col items-center justify-center min-h-screen bg-white">
            <section className="text-center w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                    STEM Hub
                </h1>
                <p className="mt-4 text-lg text-gray-500">
                    Your comprehensive platform for STEM education and research.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                    <Link href="/search">
                        <Button size={"lg"} className="text-lg">Get started</Button>
                    </Link>

                    <Link href="/about">
                        <Button className="text-lg" size={'lg'} variant="outline">
                            Learn more
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="w-full max-w-5xl px-4 py-16 mt-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Why Choose STEM Hub</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Streamline your academic workflow with AI-powered tools designed for modern researchers and students.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Search Feature */}
                    <div className="group p-8 text-center bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                            <Search className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Formula Search</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Find any formula or theorem instantly with our smart search. No more digging through textbooks or endless scrolling.
                        </p>
                    </div>

                    {/* User Experience */}
                    <div className="group p-8 text-center bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors duration-300">
                            <UserIcon className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Intuitive Interface</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Clean, responsive design that works seamlessly across all devices. Built for researchers, by researchers.
                        </p>
                    </div>

                    {/* AI-Powered */}
                    <div className="group p-8 text-center bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors duration-300">
                            <Sparkle className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Precision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Powered by advanced AI to deliver accurate results, complete with LaTeX code and detailed explanations.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;




