'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Hero() {
    return (
        <>
            {/* Hero */}
            <div className="relative overflow-hidden py-24 lg:py-28">
                <div className="relative z-10">
                    <div className="container py-10 lg:py-16">
                        <div className="max-w-2xl text-center mx-auto">
                            {/* <p className="">Make your study easier</p> */}
                            {/* Title */}
                            <div className="mt-5 max-w-2xl">
                                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    AI-Powered formula search with LATEX
                                </h1>
                            </div>
                            {/* End Title */}
                            <div className="mt-5 max-w-3xl">
                                <p className="text-xl text-muted-foreground">
                                    Professional tools for students and researchers in one place.
                                </p>
                            </div>
                            {/* Buttons */}
                            <div className="mt-8 gap-3 flex justify-center">
                                <Link href="/search">
                                    <Button size={"lg"}>Get started</Button>
                                </Link>

                                <Button size={"lg"} variant={"outline"}>
                                    <Link href="/about">
                                        Learn more
                                    </Link>
                                </Button>
                            </div>
                            {/* End Buttons */}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Hero */}
        </>
    );
}
