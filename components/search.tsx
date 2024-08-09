'use client';

import React from 'react';
import { Card } from './ui/card';
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
                    <p className="mt-3 text-xl text-gray-600">
                        Find a formula and get its LaTeX code quickly!
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-2 items-center lg:mt-4 lg:gap-4">
                    <Link href="/search/direct-search">
                        <Card className="flex cursor-pointer flex-col items-center gap-4 rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-bold">Direct Search</h2>
                            <p className="text-gray-600">
                                For those who already know the name of the formula.
                            </p>
                        </Card>
                    </Link>
                    <div className="text-3xl font-extrabold text-gray-700">
                        VS
                    </div>
                    <Link href="/search/multistep-search">
                        <Card className="flex cursor-pointer flex-col items-center gap-4 rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow">
                            <h2 className="text-2xl font-bold">Multistep Search</h2>
                            <p className="text-gray-600">
                                For those who need help narrowing down the formula.
                            </p>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
