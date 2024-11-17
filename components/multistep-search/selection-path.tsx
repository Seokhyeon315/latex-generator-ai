'use client';

import { ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface SelectionPathProps {
    category: string | null;
    field: string | null;
    topic: string | null;
    formulaCount?: number;
}

export const SelectionPath: React.FC<SelectionPathProps> = ({ category, field, topic, formulaCount = 0 }) => {
    if (!category) return null;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 mx-auto max-w-2xl">
            <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <div className="inline-flex items-center">
                        <Badge variant="outline" className="text-xs font-normal px-2 py-0.5">
                            Category
                        </Badge>
                        <span className="ml-2 font-medium text-gray-900">{category}</span>
                    </div>

                    {field && (
                        <>
                            <ChevronRight className="h-4 w-4 text-gray-400 hidden sm:block" />
                            <div className="inline-flex items-center">
                                <Badge variant="outline" className="text-xs font-normal px-2 py-0.5">
                                    Field
                                </Badge>
                                <span className="ml-2 font-medium text-gray-900">{field}</span>
                            </div>
                        </>
                    )}

                    {topic && (
                        <>
                            <ChevronRight className="h-4 w-4 text-gray-400 hidden sm:block" />
                            <div className="inline-flex items-center">
                                <Badge variant="outline" className="text-xs font-normal px-2 py-0.5">
                                    Topic
                                </Badge>
                                <span className="ml-2 font-medium text-gray-900">{topic}</span>
                            </div>
                        </>
                    )}
                </div>

                {formulaCount > 0 && (
                    <div className="flex items-center justify-between border-t pt-3 mt-2">
                        <span className="text-sm text-gray-600">Results</span>
                        <Badge
                            variant="secondary"
                            className="text-xs font-medium bg-gray-100"
                        >
                            {formulaCount} formula{formulaCount !== 1 ? 's' : ''} found
                        </Badge>
                    </div>
                )}
            </div>
        </div>
    );
}; 