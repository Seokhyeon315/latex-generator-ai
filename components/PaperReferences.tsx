'use client';

import { Card } from './ui/card';
import { ExternalLink, BookOpen } from 'lucide-react';

interface PaperReferencesProps {
    papers: {
        title: string;
        authors: string[];
        link: string;
        year: number;
        significance?: string;
        field?: string;
        subfield?: string;
    }[];
}

export function PaperReferences({ papers }: PaperReferencesProps) {
    if (!papers?.length) return null;

    return (
        <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Academic References
            </h3>
            <div className="grid gap-4">
                {papers.map((paper, index) => (
                    <Card key={index} className="p-4">
                        <h4 className="font-medium flex items-center gap-2">
                            <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline inline-flex items-center gap-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(paper.link, '_blank', 'noopener,noreferrer');
                                }}
                            >
                                {paper.title}
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {paper.field && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    {paper.field}
                                </span>
                            )}
                            {paper.subfield && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                    {paper.subfield}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            {paper.authors.join(', ')} ({paper.year})
                        </p>
                        {paper.significance && (
                            <p className="mt-2 text-sm text-gray-700">{paper.significance}</p>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
} 