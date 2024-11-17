export interface Formula {
    formulaName: string;
    description: string;
    usage: string;
    latexCode: string;
    relatedPapers?: {
        title: string;
        authors: string[];
        link: string;
        source: 'arxiv' | 'unpaywall';
        year: number;
        abstract?: string;
    }[];
} 