'use client';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { SVGProps } from "react"
import { Responsive, Search, Sparkle, UserIcon } from "./ui/icons"
import { SiConvertio } from "react-icons/si";

export default function HeroSection() {
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
            <section className="w-full max-w-6xl px-4 py-12 mt-12 bg-white">
                <h2 className="text-3xl font-bold text-center text-gray-900 md:text-4xl">Why This Website Fits for You</h2>
                <p className="mt-4 text-center text-gray-500">
                    Discover the benefits and features that make this website the perfect choice for you.
                </p>
                <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">

                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Link href="/search/direct-search">
                            <Search className="w-12 h-12 mx-auto text-yellow-500" />
                            <h3 className="mt-4 text-xl font-semibold text-gray-900">Tired of Searching for Formulas?</h3>
                            <p className="mt-2 text-gray-500">
                                Easily search and find equations without digging through heavy textbooks or class notes.
                            </p>
                        </Link>
                    </Card>


                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Link href="/search/multistep-search">
                            <ComponentIcon className="w-12 h-12 mx-auto text-pink-500" />
                            <h3 className="mt-4 text-xl font-semibold text-gray-900">Don&apos;t know the name of formula or theorem?</h3>
                            <p className="mt-2 text-gray-500">
                                Use Multistep Search feature to narrow down what you are looking for.
                            </p>
                        </Link>
                    </Card>

                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <SiConvertio className="w-12 h-12 mx-auto text-cyan-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Automatic LaTeX Conversion</h3>
                        <p className="mt-2 text-gray-500">
                            Say goodbye to manually writing LaTeX. Just enter your formula, and let our service do the rest.
                        </p>
                    </Card>

                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <UserIcon className="w-12 h-12 mx-auto text-blue-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">User-Friendly Interface</h3>
                        <p className="mt-2 text-gray-500">
                            Designed for simplicity and ease of use, our interface ensures a smooth user experience for everyone.
                        </p>
                    </Card>


                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Responsive className="w-12 h-12 mx-auto text-green-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Mobile-Friendly Responsive Website</h3>
                        <p className="mt-2 text-gray-500">
                            The website is designed to work flawlessly on all devices, ensuring a seamless experience wherever you are.
                        </p>
                    </Card>


                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Sparkle className="w-12 h-12 mx-auto text-purple-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Next-generation academic tool</h3>
                        <p className="mt-2 text-gray-500">
                            All your study and research needs, simplified with Gemini API. Discover powerful academic tools at your fingertips.
                        </p>
                    </Card>
                </div>
            </section >
        </div >
    )
}



function ComponentIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
            <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
            <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
            <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
        </svg>
    )
}




