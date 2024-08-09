'use client';

import React from 'react';
import { Card, CardTitle, CardContent } from './ui/card';
import Link from 'next/link';

export interface SearchProps extends React.ComponentProps<'div'> {
    id?: string;
}

export function Search({ id }: SearchProps) {
    return (
        <div className="max-w-2xl lg:max-w-4xl mx-auto py-12 lg:py-18">
            <div className="grid gap-6 text-center mx-2 px-2">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Formula Search
                    </h1>
                    <div className="mt-3 text-xl text-gray-600">
                        Quickly find and access the LaTeX code for a wide range of formulas and theorems.
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-2 items-center lg:mt-10 lg:gap-4">
                    <Link href="/search/direct-search">
                        <Card className="flex cursor-pointer flex-col items-center gap-4 rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow h-full">
                            <CardTitle className="text-2xl font-bold">Direct Search</CardTitle>
                            <CardContent>
                                <div className="text-gray-600">
                                    Ideal for those who already know the specific formula or theorem they are looking for.

                                    Retrieve rendered version, detailed descriptions, applications, and the corresponding LaTeX code with ease.</div>
                            </CardContent>
                        </Card>
                    </Link>
                    <div className="text-3xl font-extrabold text-gray-700">
                        VS
                    </div>
                    <Link href="/search/multistep-search">
                        <Card className="flex cursor-pointer flex-col items-center gap-4 rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow h-full">
                            <CardTitle className="text-2xl font-bold">Multistep Search</CardTitle>
                            <CardContent>
                                <div className="text-gray-600">
                                    Designed for users who need assistance in narrowing down potential formulas or theorems.

                                    Step through a guided process to find the most relevant formulas or theorems, including comprehensive descriptions and LaTeX codes.</div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
