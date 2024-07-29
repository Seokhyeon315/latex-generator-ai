'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { SVGProps } from "react"

export default function HeroSection() {
    return (
        <div className="py-20 lg:py-24 px-4 flex flex-col items-center justify-center min-h-screen bg-white">
            <section className="text-center w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                    AI-Powered Formula Search with LATEX
                </h1>
                <p className="mt-4 text-lg text-gray-500">
                    Professional tools for students and researchers in one place.
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
            <section className="w-full max-w-6xl px-4 py-12 mt-12 bg-white">
                <h2 className="text-3xl font-bold text-center text-gray-900 md:text-4xl">Why This Website Fits for You</h2>
                <p className="mt-4 text-center text-gray-500">
                    Discover the benefits and features that make this website the perfect choice for you.
                </p>
                <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md">
                        <UserIcon className="w-12 h-12 mx-auto text-blue-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">User-Friendly Interface</h3>
                        <p className="mt-2 text-gray-500">
                            Our website is designed with a focus on simplicity and ease of use, ensuring a seamless experience for all
                            users.
                        </p>
                    </Card>
                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md">
                        <ShieldIcon className="w-12 h-12 mx-auto text-green-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Secure and Reliable</h3>
                        <p className="mt-2 text-gray-500">
                            We prioritize your security and privacy, providing a safe and trustworthy platform.
                        </p>
                    </Card>
                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md">
                        <PowerIcon className="w-12 h-12 mx-auto text-yellow-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">24/7 Customer Support</h3>
                        <p className="mt-2 text-gray-500">
                            Our dedicated support team is available around the clock to assist you with any issues or questions.
                        </p>
                    </Card>
                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md">
                        <BarChartIcon className="w-12 h-12 mx-auto text-red-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Advanced Analytics</h3>
                        <p className="mt-2 text-gray-500">
                            Gain valuable insights with our comprehensive analytics tools, helping you make informed decisions.
                        </p>
                    </Card>
                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md">
                        <MergeIcon className="w-12 h-12 mx-auto text-purple-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Seamless Integrations</h3>
                        <p className="mt-2 text-gray-500">
                            Easily integrate with your favorite tools and services for a streamlined workflow.
                        </p>
                    </Card>
                    <Card className="p-6 text-center bg-gray-50 rounded-lg shadow-md">
                        <ComponentIcon className="w-12 h-12 mx-auto text-pink-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">Customizable Features</h3>
                        <p className="mt-2 text-gray-500">
                            Tailor the website to your specific needs with our flexible and customizable features.
                        </p>
                    </Card>
                </div>
            </section>
        </div>
    )
}

function BarChartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <line x1="12" x2="12" y1="20" y2="10" />
            <line x1="18" x2="18" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="16" />
        </svg>
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


function MergeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="m8 6 4-4 4 4" />
            <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
            <path d="m20 22-5-5" />
        </svg>
    )
}


function PowerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M12 2v10" />
            <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
        </svg>
    )
}


function ShieldIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
    )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}