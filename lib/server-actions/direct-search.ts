'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import { createStreamableValue } from 'ai/rsc';

const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
);

const formulaSchema = z.object({
    formulas: z.array(
        z.object({
            formulaName: z.string(),
            description: z.string(),
            usage: z.string(),
            explanation: z.string(),
            latexCode: z.string(),
        })
    ),
});

const cleanLatexCode = (latex: string) => {
    if (!latex) return '$$$$';
    
    // Remove any existing $$ and whitespace
    let cleaned = latex.replace(/^\$\$|\$\$$/g, '').trim();

    // Fix common LaTeX issues
    cleaned = cleaned
        // Fix backslashes
        .replace(/\\\\/g, '\\')
        // Fix braces
        .replace(/\}\}/g, '}')
        .replace(/\{\{/g, '{')
        // Fix text commands - handle text content more carefully
        .replace(/\\text\{([^}]*)\}/g, (match, content) => {
            // Replace parentheses in text with escaped versions
            return `\\text{${content.replace(/[()]/g, '\\$&')}}`;
        })
        // Fix vectors
        .replace(/\\vec{([^}]*)}/g, '\\mathbf{$1}')
        // Fix dots
        .replace(/\\dot{([^}]*)}/g, '\\dot{$1}')
        // Fix fractions
        .replace(/\\frac(?!\{)/g, '\\frac{')
        // Fix matrices
        .replace(/\\begin{([^}]*)}/g, '\\begin{$1}')
        .replace(/\\end{([^}]*)}/g, '\\end{$1}')
        // Fix common commands
        .replace(/\\left\(/g, '(')
        .replace(/\\right\)/g, ')')
        .replace(/\\left\{/g, '\\{')
        .replace(/\\right\}/g, '\\}')
        // Fix subscripts and superscripts
        .replace(/([^\\])_([a-zA-Z0-9])(?![{])/g, '$1_{$2}')
        .replace(/([^\\])\^([a-zA-Z0-9])(?![{])/g, '$1^{$2}')
        // Fix spacing
        .replace(/\s+/g, ' ')
        .trim();

    return `$$${cleaned}$$`;
};

export async function directSearchAction(userInput: string) {
    const objectStream = createStreamableValue();
    let streamClosed = false;

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            generationConfig: {
                temperature: 0.3,
                topK: 1,
                topP: 0.8,
                maxOutputTokens: 2048,
            }
        });

        const promptText = `Provide information about the mathematical formula, equation, or theorem: "${userInput}".

        Return a JSON object with this exact structure (no markdown or code blocks):
        {
            "formulas": [{
                "formulaName": "The exact name of the formula/equation/theorem",
                "description": "A clear, concise description",
                "usage": "Practical applications and use cases",
                "explanation": "Detailed explanation of each symbol and component",
                "latexCode": "The complete LaTeX code with double backslashes"
            }]
        }`;

        const result = await model.generateContent(promptText);
        const response = result.response;
        const text = response.text();

        console.log('Raw API response:', text); // Debug log

        try {
            // Clean up the response text
            const cleanedText = text
                .replace(/```[a-z]*\n?/g, '')  // Remove code block markers
                .replace(/```/g, '')
                .trim();

            console.log('Cleaned text:', cleanedText); // Debug log

            let jsonResponse;
            try {
                jsonResponse = JSON.parse(cleanedText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                throw new Error('Invalid JSON format');
            }

            if (!jsonResponse || !jsonResponse.formulas || !Array.isArray(jsonResponse.formulas)) {
                console.error('Invalid response structure:', jsonResponse);
                throw new Error('Invalid response structure');
            }

            const validationResult = formulaSchema.safeParse(jsonResponse);

            if (validationResult.success) {
                const cleanedFormulas = {
                    formulas: validationResult.data.formulas.map(formula => ({
                        ...formula,
                        latexCode: cleanLatexCode(formula.latexCode)
                    }))
                };
                objectStream.update(cleanedFormulas);
            } else {
                console.error('Validation error:', validationResult.error);
                throw new Error('Invalid formula format');
            }
        } catch (parseError) {
            console.error('Processing error:', parseError);
            objectStream.update({
                formulas: [{
                    formulaName: 'Input Error',
                    description: 'Please enter a valid mathematical formula, equation, or theorem name.',
                    usage: 'Example inputs: "Pythagorean Theorem", "Quadratic Formula", "Einstein Mass-Energy Equation"',
                    explanation: 'Make sure to use standard mathematical terminology.',
                    latexCode: ''
                }]
            });
        }
    } catch (e) {
        console.error('Action error:', e);
        objectStream.update({
            formulas: [{
                formulaName: 'System Error',
                description: e instanceof Error ? e.message : 'An unexpected error occurred.',
                usage: 'Please try again with a different input.',
                explanation: 'If the problem persists, try using more specific mathematical terminology.',
                latexCode: ''
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