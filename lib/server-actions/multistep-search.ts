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

export async function getMoreFormulas({
    category,
    field,
    topic,
    page,
    existingFormulas = [],
    retryAttempt = false
}: {
    category: string | null;
    field: string | null;
    topic: string | null;
    page: number;
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

        const prompt = `Generate 5 mathematical formulas for ${topic} in ${field}.
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
        3. Each formula must be unique
        4. Focus on fundamental formulas
        5. Keep LaTeX simple`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Clean and parse the response
        const cleanedText = text
            .replace(/```[a-z]*\n?/g, '')  // Remove code block markers
            .replace(/```/g, '')
            .trim();

        try {
            // Try to parse as a direct array first
            let formulas;
            try {
                formulas = JSON.parse(cleanedText);
            } catch {
                // If direct array parse fails, try parsing as an object with formulas property
                const parsed = JSON.parse(cleanedText);
                formulas = parsed.formulas || [];
            }

            if (!Array.isArray(formulas)) {
                console.error('Invalid response structure:', formulas);
                return [];
            }

            const validatedFormulas = formulas
                .filter((formula: any) => {
                    const isValid = formula && 
                                  typeof formula === 'object' &&
                                  formula.formulaName &&
                                  formula.description &&
                                  formula.latexCode;
                    
                    if (!isValid) {
                        console.log('Invalid formula object:', formula);
                    }
                    return isValid;
                })
                .map((formula: any) => ({
                    formulaName: String(formula.formulaName),
                    description: String(formula.description),
                    usage: String(formula.usage || 'No usage information available'),
                    latexCode: cleanLatexCode(formula.latexCode)
                }));

            return validatedFormulas;

        } catch (parseError) {
            console.error('Parse error:', parseError);
            console.error('Cleaned text:', cleanedText);
            return [];
        }

    } catch (error) {
        console.error('Error generating formulas:', error);
        return [];
    }
} 