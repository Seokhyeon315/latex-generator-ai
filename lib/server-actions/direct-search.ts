'use server';

import { GoogleGenerativeAI, SafetySetting } from '@google/generative-ai';
import { z } from 'zod';
import { createStreamableValue } from 'ai/rsc';
import { LRUCache } from 'lru-cache';

// Validate required environment variables
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!API_KEY) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY environment variable is required');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const GEMINI_ERRORS = {
    RECITATION: 'RECITATION',
    SAFETY: 'SAFETY',
    INVALID_RESPONSE: 'INVALID_RESPONSE'
} as const;

const formulaSchema = z.object({
    formulas: z.array(
        z.object({
            formulaName: z.string().min(1),
            description: z.string().min(1),
            usage: z.string().min(1),
            explanation: z.string().min(1),
            latexCode: z.string(),
            academicReferences: z.array(
                z.object({
                    title: z.string().min(1),
                    authors: z.string().min(1),
                    year: z.union([
                        z.string(),
                        z.number()
                    ]).transform(val => {
                        const yearStr = String(val);
                        const yearMatch = yearStr.match(/\d{4}/);
                        return yearMatch ? yearMatch[0] : '2024';
                    }),
                    significance: z.string().min(1),
                    field: z.string().optional(),
                    subfield: z.string().optional()
                })
            ).optional().default([])
        })
    ).min(1),
});

const cleanLatexCode = (latex: string) => {
    if (!latex) return '$$$$';
    return latex.includes('$$') ? latex : `$$${latex}$$`;
};

interface ArxivPaper {
    title: string;
    authors: string[];
    link: string;
    summary: string;
    published: string;
}

async function getRelatedPapers(formulaName: string): Promise<ArxivPaper[]> {
    const query = encodeURIComponent(`"${formulaName}" OR "${formulaName} equation"`);
    const url = `http://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=5&sortBy=relevance`;
    
    try {
        const response = await fetch(url);
        const xmlData = await response.text();
        // For now, return empty array until we implement XML parsing
        return [];
    } catch (error) {
        console.error('Error fetching arXiv papers:', error);
        return [];
    }
}

async function getOpenAccessPapers(doi: string) {
    const email = process.env.UNPAYWALL_EMAIL;
    const url = `https://api.unpaywall.org/v2/${doi}?email=${email}`;
    // Implementation here
}

// Define interfaces for type safety
interface FormulaReference {
    title: string;
    authors: string;
    year: string | number;
    significance: string;
    field?: string;
    subfield?: string;
}

interface Formula {
    formulaName: string;
    description: string;
    usage: string;
    explanation: string;
    latexCode: string;
    academicReferences?: FormulaReference[];
}

interface JsonResponse {
    formulas: Formula[];
}

// Add a more structured streaming approach
const createProgressStream = (objectStream: any) => {
    let closed = false;
    return {
        async update(data: any) {
            if (closed) return;
            try {
                await objectStream.update(data);
            } catch (error) {
                console.error('Stream update error:', error);
            }
        },
        
        close() {
            if (!closed) {
                closed = true;
                objectStream.done();
            }
        }
    };
};

// Add error types
type ErrorType = 'JSON_ERROR' | 'VALIDATION_ERROR' | 'API_ERROR' | 'RECITATION_ERROR';

interface ErrorResponse {
    type: ErrorType;
    title: string;
    message: string;
    suggestion: string;
}

const getErrorResponse = (error: Error, type: ErrorType): ErrorResponse => {
    const errorMap: Record<ErrorType, ErrorResponse> = {
        JSON_ERROR: {
            type: 'JSON_ERROR',
            title: 'Formula Not Found',
            message: 'We couldn\'t find information about this formula.',
            suggestion: 'Try checking the spelling or use a more common name for the formula.'
        },
        VALIDATION_ERROR: {
            type: 'VALIDATION_ERROR',
            title: 'Invalid Response',
            message: 'The formula information was incomplete.',
            suggestion: 'Try searching for a different formula or use more specific terms.'
        },
        API_ERROR: {
            type: 'API_ERROR',
            title: 'Service Error',
            message: 'Our service is having temporary issues.',
            suggestion: 'Please try again in a few moments.'
        },
        RECITATION_ERROR: {
            type: 'RECITATION_ERROR',
            title: 'Content Generation Error',
            message: 'We had trouble generating unique content.',
            suggestion: 'Try searching for a different formula or rephrase your query.'
        }
    };

    return errorMap[type];
};

const formulaCache = new LRUCache<string, any>({
    max: 100, // Maximum number of items
    ttl: 1000 * 60 * 60 * 24, // 24 hour time-to-live
});

export async function directSearchAction(userInput: string) {
    const objectStream = createStreamableValue();
    let streamClosed = false;

    try {
        if (!userInput?.trim()) {
            throw new Error('Please enter a search term');
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            generationConfig: {
                temperature: 0.3,
                topK: 1,
                topP: 0.8,
                maxOutputTokens: 2048,
            },
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                }
            ] as SafetySetting[]
        });

        const promptText = `Explain the mathematical formula/equation/theorem: "${userInput}".
Focus on:
1. Core concepts
2. Practical applications
3. Key components
4. Historical context

Special handling for specific equations:
- For Maxwell's Equations, include all four equations in aligned format:
  \\begin{aligned}
  \\nabla \\cdot \\mathbf{E} &= \\frac{\\rho}{\\epsilon_0} \\\\
  \\nabla \\cdot \\mathbf{B} &= 0 \\\\
  \\nabla \\times \\mathbf{E} &= -\\frac{\\partial \\mathbf{B}}{\\partial t} \\\\
  \\nabla \\times \\mathbf{B} &= \\mu_0\\mathbf{J} + \\mu_0\\epsilon_0\\frac{\\partial \\mathbf{E}}{\\partial t}
  \\end{aligned}

LaTeX Rules:
1. For basic formulas (like Pythagorean Theorem: a^2 + b^2 = c^2), use single-line format
2. For equation sets (like Maxwell's Equations), use aligned environment with all equations
3. NO formula names in LaTeX code
4. Use $expression$ for inline math in explanations

Return ONLY a valid JSON object in this exact format (no additional text):
{
    "formulas": [{
        "formulaName": "Name (use full name, e.g., 'Maxwell's Equations' not just one part)",
        "description": "Brief overview of the complete set of equations if applicable",
        "usage": "Applications",
        "explanation": "Component breakdown with $inline_math$",
        "latexCode": "Complete set of equations if applicable",
        "academicReferences": [
            {
                "title": "Paper title",
                "authors": "Names",
                "year": "YYYY",
                "significance": "Impact"
            }
        ]
    }]
}`;

        let attempts = 0;
        const maxAttempts = 3;
        
        while (attempts < maxAttempts) {
            try {
                const result = await model.generateContent(promptText);
                const text = result.response.text();
                
                // Better JSON cleaning
                const cleanedText = text
                    .replace(/```json\s*/g, '')
                    .replace(/```\s*/g, '')
                    .replace(/\n/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();

                let jsonResponse: JsonResponse;
                try {
                    jsonResponse = JSON.parse(cleanedText);
                } catch (parseError) {
                    attempts++;
                    if (attempts === maxAttempts) {
                        await objectStream.update({
                            formulas: [{
                                formulaName: 'Error',
                                description: '',
                                usage: '',
                                explanation: '',
                                latexCode: '',
                                academicReferences: []
                            }]
                        });
                        break;
                    }
                    continue;
                }

                const processedResponse = {
                    formulas: jsonResponse.formulas?.map((formula: Formula) => ({
                        ...formula,
                        formulaName: String(formula.formulaName || ''),
                        description: String(formula.description || ''),
                        usage: String(formula.usage || ''),
                        explanation: String(formula.explanation || ''),
                        latexCode: String(formula.latexCode || ''),
                        academicReferences: formula.academicReferences?.map((ref: FormulaReference) => ({
                            ...ref,
                            title: String(ref.title || ''),
                            authors: String(ref.authors || ''),
                            year: String(ref.year || '2024'),
                            significance: String(ref.significance || '')
                        })) || []
                    })) || []
                };

                const validationResult = formulaSchema.safeParse(processedResponse);

                if (validationResult.success) {
                    await objectStream.update({
                        formulas: validationResult.data.formulas.map(formula => ({
                            ...formula,
                            latexCode: cleanLatexCode(formula.latexCode)
                        }))
                    });
                    break;
                }

                attempts++;
                if (attempts < maxAttempts) {
                    model.generationConfig.temperature = Math.min(0.9, 0.3 + (attempts * 0.3));
                    continue;
                }
            } catch (error) {
                attempts++;
                if (attempts === maxAttempts) {
                    await objectStream.update({
                        formulas: [{
                            formulaName: 'Error',
                            description: '',
                            usage: '',
                            explanation: '',
                            latexCode: '',
                            academicReferences: []
                        }]
                    });
                    break;
                }
                continue;
            }
        }
    } catch (e) {
        await objectStream.update({
            formulas: [{
                formulaName: 'Error',
                description: '',
                usage: '',
                explanation: '',
                latexCode: '',
                academicReferences: []
            }]
        });
    } finally {
        if (!streamClosed) {
            objectStream.done();
            streamClosed = true;
        }
    }

    return { object: objectStream.value };
} 