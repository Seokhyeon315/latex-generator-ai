'use client';

import React, { useState } from 'react';
import { Card } from './ui/card';
import { MultiStepSearchPanel } from '@/components/MultiSearchPanel';
import { DirectSearchForm } from '@/components/direct-search-form';
import { Button } from './ui/button';

export interface SearchProps extends React.ComponentProps<'div'> {
    id?: string;
}

export function Search({ id }: SearchProps) {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const handleBackClick = () => {
        setSelectedStatus(null);
    };

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
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedStatus ? (
                            <Button onClick={handleBackClick} className=" text-base hover:bg-gray-600">
                                Choose status again
                            </Button>
                        ) : (
                            'Choose your status'
                        )}
                    </h2>

                    {!selectedStatus && (
                        <div className="grid gap-4">
                            <Card
                                className="flex cursor-pointer flex-row items-start sm:items-center gap-4 rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow"
                                onClick={() => setSelectedStatus('known')}
                            >
                                <span className="text-gray-800">Already know the name of the formula.</span>
                            </Card>

                            <Card
                                className="flex cursor-pointer flex-row items-start sm:items-center gap-4 rounded-xl p-4 bg-white shadow hover:shadow-lg transition-shadow"
                                onClick={() => setSelectedStatus('help')}
                            >
                                <span className="text-gray-800">Need help to narrow it down.</span>
                            </Card>
                        </div>
                    )}

                    {selectedStatus === 'known' && <DirectSearchForm id={id} />}
                    {selectedStatus === 'help' && <MultiStepSearchPanel id={id} />}
                </div>
            </div>
        </div>
    );
}
