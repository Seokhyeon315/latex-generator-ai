'use client';

import React from 'react';
import { Card, } from './ui/card';
import Link from 'next/link';

export interface SearchProps extends React.ComponentProps<'div'> {
    id?: string;
}

export function Search({ id }: SearchProps) {

    return (
        <div className="max-w-2xl lg:max-w-4xl mx-auto py-12 lg:py-18">
            <div className="grid gap-6">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Formula Search
                    </h1>
                    <p className="mt-3 text-xl text-gray-600">
                        Find a formula and get its LaTeX code quickly!
                    </p>
                </div>

                <div className="text-center">
                    <div className="grid gap-4">
                        <Link href="/search/direct-search">
                            <Card
                                className="flex cursor-pointer flex-row items-start sm:items-center gap-4 rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow"

                            >

                                <span className="text-gray-800">Already know the name of the formula.</span>
                            </Card>
                        </Link>
                        <Link href="/search/multistep-search">
                            <Card
                                className="flex cursor-pointer flex-row items-start sm:items-center gap-4 rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow"

                            >
                                <span className="text-gray-800">Need help to narrow it down.</span>
                            </Card>
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    );
}
