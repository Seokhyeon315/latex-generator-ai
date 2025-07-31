'use server';

import { GoogleGenerativeAI, SafetySetting } from '@google/generative-ai';
import { z } from 'zod';
import { createStreamableValue } from 'ai/rsc';
import { formulaDB } from '../services/formula-database';

// Validate required environment variables
const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!API_KEY) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY environment variable is required');
}

const genAI = new GoogleGenerativeAI(API_KEY);

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

/**
 * Direct search action - Database-first approach with AI fallback
 * Searches the curated formula database first, then falls back to AI if not found
 */
export async function directSearchAction(userInput: string) {
    const objectStream = createStreamableValue();
    let streamClosed = false;

    try {
        if (!userInput?.trim()) {
            throw new Error('Please enter a search term');
        }

        // Performing database search

        // First, try database search
        try {
            const searchResult = await formulaDB.searchFormulas(userInput, undefined, 5, 0);
            
            if (searchResult.formulas.length > 0) {
                // Found formulas in database
                
                // Convert to the expected format for the UI
                const dbFormulas = searchResult.formulas.map(formula => ({
                    formulaName: formula.formulaName,
                    description: formula.description,
                    usage: formula.usage,
                    explanation: formula.explanation,
                    latexCode: formula.latexCode,
                    academicReferences: formula.academicReferences.map(ref => ({
                        title: ref.title,
                        authors: Array.isArray(ref.authors) ? ref.authors.join(', ') : ref.authors,
                        year: ref.year.toString(),
                        significance: ref.significance
                    }))
                }));

                await objectStream.update({ formulas: dbFormulas });
                return { object: objectStream.value };
            }
        } catch (dbError) {
            // Database search failed, using AI fallback
        }

        // Fallback to AI generation if no results found in database
        // Using AI generation as fallback
        
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
Focus on Math, Physics, Aerospace, or Mechanical Engineering domains only.

Focus on:
1. Core concepts and mathematical foundation
2. Practical applications in STEM fields
3. Key components and variables
4. Academic context and significance

LaTeX formatting rules:
1. Use proper LaTeX math delimiters ($$...$$)
2. Use standard mathematical notation
3. For equation sets, use aligned environment
4. No formula names in LaTeX code itself

Return ONLY a valid JSON object in this exact format:
{
    "formulas": [{
        "formulaName": "Complete formula name",
        "description": "Comprehensive description focusing on STEM applications",
        "usage": "Specific applications in target domains",
        "explanation": "Detailed explanation of components and significance",
        "latexCode": "Properly formatted LaTeX with $$...$$",
        "academicReferences": [
            {
                "title": "Academic paper or textbook title",
                "authors": "Author names",
                "year": "YYYY",
                "significance": "Why this reference is important"
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
                
                // Clean and parse JSON response
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
                        throw new Error('Failed to parse AI response after multiple attempts');
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
                        latexCode: cleanLatexCode(String(formula.latexCode || '')),
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
                    // AI generation successful
                    await objectStream.update({ formulas: validationResult.data.formulas });
                    break;
                } else {
                    // AI response validation failed
                    attempts++;
                    if (attempts < maxAttempts) {
                        model.generationConfig.temperature = Math.min(0.9, 0.3 + (attempts * 0.3));
                        continue;
                    }
                    throw new Error('AI response validation failed');
                }
            } catch (error) {
                attempts++;
                if (attempts === maxAttempts) {
                    throw error;
                }
                // AI attempt failed, retrying
                continue;
            }
        }
    } catch (e) {
        // Search operation failed
        await objectStream.update({
            formulas: [{
                formulaName: 'Search Error',
                description: 'Unable to find or generate formula information',
                usage: 'Please try a different search term or check your spelling',
                explanation: 'This may be due to network issues or the formula not being available in our database',
                latexCode: '$$\\text{Formula not found}$$',
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