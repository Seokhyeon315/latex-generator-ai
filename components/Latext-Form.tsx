'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    BriefcaseIcon,

    HeartIcon,
    SearchIcon,
    SettingsIcon,
} from "lucide-react";

export default function LatexForm() {
    return (
        <>
            {/* Hero */}
            <div className="relative overflow-hidden">
                <div className="container py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Latex Generator
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            Stay in the know with insights from industry experts.
                        </p>
                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            {/* Form */}
                            <form>
                                <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                                    <div className="flex-[1_0_0%]">
                                        <Label htmlFor="formula" className="sr-only">
                                            Search a formula
                                        </Label>
                                        <Input
                                            name="formula"
                                            className="h-full"
                                            id="formula"
                                            placeholder="Search formula"
                                        />
                                    </div>
                                    <div className="flex-[0_0_auto]">
                                        <Button size={"icon"}>
                                            <SearchIcon />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            {/* End Form */}
                        </div>
                        <div className="mt-10 sm:mt-20 flex flex-wrap gap-2 justify-center">
                            <Button variant={"outline"}>
                                <BriefcaseIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                                Math
                            </Button>
                            <Button variant={"outline"}>
                                <SettingsIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                                Physics
                            </Button>
                            <Button variant={"outline"}>
                                <HeartIcon className="flex-shrink-0 w-3 h-auto mr-2" />
                                Engineering
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
            {/* End Hero */}
        </>
    );
}
