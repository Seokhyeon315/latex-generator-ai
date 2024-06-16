'use client';

//TODO:
// 1. User can search the equation or formula by typing the name of the formula in the search bar.
// 2. Below the equation, LATEX code will be automatically generated together. 
// 3. LATEX code should be copyable to the clipboard.

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    SearchIcon,
} from "lucide-react";

export default function FormulaFinderForm() {
    return (
        <>
            {/* Hero */}
            <div className="relative overflow-hidden">
                <div className="container py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Formula Finder
                        </h1>
                        <p className="mt-3 text-xl text-muted-foreground">
                            Search the equation name or upload an image of your formula to get Latex form quickly
                        </p>
                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            {/* Form */}
                            <form>
                                <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                                    {/* Need image attach icon and hover the text here */}

                                    {/* image attach icon end */}
                                    <div className="flex-[1_0_0%]">
                                        <Label htmlFor="formula" className="sr-only">
                                            Search a formula
                                        </Label>
                                        <Input
                                            name="formula"
                                            className="h-full"
                                            id="formula"
                                            placeholder="Search here"
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
                            something simple explanation or steps to use here

                        </div>
                    </div>
                </div>
            </div>
            {/* End Hero */}
        </>
    );
}
