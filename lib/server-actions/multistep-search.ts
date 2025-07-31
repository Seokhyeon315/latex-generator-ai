'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Formula } from '../types';

const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
);

const cleanLatexCode = (latex: string) => {
    if (!latex) return '$$$$';
    return `$$${latex}$$`;
};

// Add a function to check for duplicates
const isDuplicateFormula = (newFormula: Formula, existingFormulas: Formula[]): boolean => {
    return existingFormulas.some(existing => {
        // Check for exact name match
        const nameMatch = existing.formulaName.toLowerCase() === newFormula.formulaName.toLowerCase();
        
        // Check for similar LaTeX code (ignoring whitespace and formatting)
        const cleanLatex = (latex: string) => latex.replace(/\s+/g, '').replace(/\\\\/g, '\\');
        const latexMatch = cleanLatex(existing.latexCode) === cleanLatex(newFormula.latexCode);
        
        return nameMatch || latexMatch;
    });
};

export async function getMoreFormulas({
    category,
    field,
    topic,
    existingFormulas = [],
    retryAttempt = false
}: {
    category: string | null;
    field: string | null;
    topic: string | null;
    existingFormulas?: Formula[];
    retryAttempt?: boolean;
}): Promise<Formula[]> {
    if (!category || !field || !topic) {
        console.error('Missing required parameters:', { category, field, topic });
        return [];
    }

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            generationConfig: {
                temperature: retryAttempt ? 0.5 : 0.3,
                topK: 1,
                topP: 0.8,
                maxOutputTokens: 2048,
            }
        });

        // Modify the prompt to exclude existing formulas
        const existingNames = existingFormulas.map(f => f.formulaName).join(', ');
        const prompt = `Generate 5 mathematical formulas for ${topic} in ${field}.
        ${existingNames ? `IMPORTANT: Do NOT generate these already existing formulas: ${existingNames}` : ''}
        
        Return a JSON array with this exact structure (no markdown or code blocks):
        [
            {
                "formulaName": "name",
                "description": "description",
                "usage": "usage",
                "latexCode": "latex code with double backslashes for commands"
            }
        ]
        
        Rules:
        1. Use standard LaTeX math notation
        2. Use DOUBLE backslashes for LaTeX commands (e.g., \\sin instead of \sin)
        3. Each formula must be unique and NOT in the list of existing formulas
        4. Focus on fundamental formulas
        5. Keep LaTeX simple`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Clean and parse the response
        const cleanedText = text
            .replace(/```[a-z]*\n?/g, '')
            .replace(/```/g, '')
            .trim();

        try {
            let formulas;
            try {
                formulas = JSON.parse(cleanedText);
            } catch {
                const parsed = JSON.parse(cleanedText);
                formulas = parsed.formulas || [];
            }

            if (!Array.isArray(formulas)) {
                // Invalid response structure
                return [];
            }

            // Filter out duplicates
            const validatedFormulas = formulas
                .filter((formula: any) => {
                    const isValid = formula && 
                                  typeof formula === 'object' &&
                                  formula.formulaName &&
                                  formula.description &&
                                  formula.latexCode;
                    
                    if (!isValid) {
                        // Invalid formula object
                        return false;
                    }

                    // Check for duplicates
                    const isDuplicate = isDuplicateFormula(formula, existingFormulas);
                    if (isDuplicate) {
                        // Duplicate formula found
                        return false;
                    }

                    return true;
                })
                .map((formula: any) => ({
                    id: `generated-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
                    formulaName: String(formula.formulaName),
                    description: String(formula.description),
                    usage: String(formula.usage || 'No usage information available'),
                    explanation: String(formula.explanation || formula.description || 'No explanation available'),
                    latexCode: cleanLatexCode(formula.latexCode),
                    domain: category as 'math' | 'physics' | 'aerospace',
                    category: category,
                    field: field || 'general',
                    difficulty: 'intermediate' as const,
                    applications: ['General application'],
                    keywords: [formula.formulaName?.toLowerCase() || 'formula'],
                    academicReferences: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    version: '1.0.0',
                    verified: false
                }));

            return validatedFormulas;

        } catch (parseError) {
            // Parse error occurred
            return [];
        }

    } catch (error) {
        // Error generating formulas
        return [];
    }
} 