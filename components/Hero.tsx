'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();
    return (
        <>
            {/* Hero */}
            <div className="relative overflow-hidden py-24 lg:py-32">
                <div className="relative z-10">
                    <div className="container py-10 lg:py-16">
                        <div className="max-w-2xl text-center mx-auto">
                            <p className="">Make your study easier</p>
                            {/* Title */}
                            <div className="mt-5 max-w-2xl">
                                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    AI-Powered Tool for Reasearch
                                </h1>
                            </div>
                            {/* End Title */}
                            <div className="mt-5 max-w-3xl">
                                <p className="text-xl text-muted-foreground">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                            {/* Buttons */}
                            <div className="mt-8 gap-3 flex justify-center">
                                <Button size={"lg"}
                                    onClick={() => {
                                        router.push('/generate');
                                    }}>Get started</Button>
                                <Button size={"lg"} variant={"outline"}>
                                    Learn more
                                    {/* Click Learn more button will scroll down to features section */}
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
