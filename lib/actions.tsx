import 'server-only'

import * as React from 'react';
import { google } from '@ai-sdk/google'
import { generateObject, streamObject, } from 'ai'
import { createAI, createStreamableValue, getMutableAIState } from 'ai/rsc'
import { nanoid } from './utils';
import { z } from 'zod';
import { GoogleAIFileManager } from '@google/generative-ai/server'
import { GoogleGenerativeAI } from '@google/generative-ai'



export type Message = {
    role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
    content: string
    id?: string
    name?: string
    display?: {
        name: string
        props: Record<string, any>
    }
}


// Define the AI state and UI state types
export type AIState = {
    id?: string;
    interactions?: string[];
    content?: string;
    messages: Message[]
};

// Define the UIState type similarly
export type UIState = {
    id?: string;
    // content: string; 
    display: React.ReactNode;
    // toolInvocations?: ToolInvocation[];
}[];


const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

const fileManager = new GoogleAIFileManager(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

const formulaSchema = z.object({
    formulas: z.array(
        z.object({
            formulaName: z.string().describe('The name of the formula or equation or theorem.'),
            description: z.string().describe('A detailed description of the formula or equation.'),
            usage: z.string().describe('The usage or application of the formula or equation. Ensure completeness and specificity.'),
            explanation: z.string().describe(`Provide a detailed explanation of each symbol in the latex code, including both LHS (Left-hand-side) and RHS (Right-hand-side). Ensure single backslashes`),
            latexCode: z.string().describe('The LaTeX code representation of the formula or equation, wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.'),
        })
    ),
});

// Use the streamObject function to get the formula or equation
async function directSearchAction(userInput: string) {
    'use server';

    let streamClosed = false;
    const objectStream = createStreamableValue();
    (async () => {
        try {
            const { partialObjectStream } = await streamObject({
                model: google('models/gemini-1.5-pro'),
                temperature: 0,
                system: `You are an AI specialized in providing detailed information on equations or formulas or theorem in the fields of mathematics, engineering, and science.
                When a user provides the name of an equation or formula, respond with the following:
                1. **Formula Name**: Provide the name of the formula or equation or theorem.
                2. **Description**: Offer a detailed description of the formula or equation.
                3. **Usage**: Describe the applications or usage of the formula or equation. Ensure the response is complete and specific to various contexts. Ensure single backslashes for LaTeX commands.
                4. **LaTeX Code**: Provide the LaTeX code representation of the formula or equation, wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.
                5. **Explanation of Symbols**: Provide the human-readable renderd version of symbols or variables. This should include subscripts for any integral bounds. Wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.
                
                Only respond to queries that are relevant to these fields. If the user input is not a formula name, respond with "Invalid input. Please try again. Make sure to type the name of a formula."`,
                prompt: userInput,
                schema: formulaSchema,
            });
            let foundValidData = false;
            for await (const partialObject of partialObjectStream) {
                if (formulaSchema.safeParse(partialObject).success) {
                    // Ensure LaTeX code is formatted correctly
                    if (partialObject.formulas) {
                        partialObject.formulas.forEach(formula => {
                            if (formula && formula.latexCode) {
                                formula.latexCode = formula.latexCode.replace(/\\\\/g, '\\');
                            }
                        });
                    }
                    foundValidData = true;
                    if (!streamClosed) {
                        objectStream.update(partialObject);
                        console.log(partialObject);
                    }
                }
            }
            if (!foundValidData) {
                objectStream.update({ error: 'Invalid input. Please try again. Make sure to type the name of a formula.' });
            }
        } catch (e) {
            console.error(e);
            objectStream.error(e);
            objectStream.update({ error: 'An unexpected error occurred. Please try again.' });
        } finally {
            if (!streamClosed) {
                objectStream.done();
                streamClosed = true;
            }
        }
    })();


    return { object: objectStream.value };
}

// Convert Image to Latex code action
async function imageToLatexAction(imageBase64: string) {
    'use server';

    try {
        // Extract the base64 image data
        const imageData = imageBase64.split(',')[1];

        // Get the generative model with the specified configuration
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            generationConfig: {
                temperature: 0,
            },
            systemInstruction: `You are an AI assitant specialized in digitalizing handwritten paper, especially in mathematical, science, and engineering. 
    
                You must follow the instructions:
                1. When you scan the image, scan direction is from top left to right bottom.
                2. If the image includes the text, convert them with Markdown syntax.
                3. If the image includes the mathematical equations or formulas, convert them with LaTeX syntax and wrapped each equation in $$.
                4. If there is underline wave or line describing symbol, ignore them.
                5. If there is a geometrical shape of figure, ignore them.
                6. For the output, don't include many space or extra tab bewteen markdown text. 
                7. Output should be aligned vertically and aligned horizontally.
                `
        });

        // Define the prompt and image structure
        const prompt = 'Convert the handwritten text and mathematical equations or formulas in the image to digitalized format.';
        const image = {
            inlineData: {
                data: imageData,
                mimeType: 'image/png',
            }
        };

        // Generate content using the model with prompt and image
        const result = await model.generateContent([prompt, image]);

        // Parse and return the response text
        const text = result.response.text();
        console.log(result);

        return {
            display: text
        };
    } catch (error) {
        console.error('Error processing image:', error);
        return {
            id: nanoid(),
            display: 'An error occurred while processing the image.'
        };
    }
}



async function submitInputAction(content: string) {
    'use server';

    const history = getMutableAIState();


    const { object } = await generateObject({
        model: google('models/gemini-1.5-pro'),
        temperature: 0,
        prompt: content,
        mode: 'tool',
        system: `You are an AI specialized in providing detailed information on equations or formulas or theorem based on user's query.
        You must follow the instructions:
            1. Provide the name of the formula, equation or theorem.
            2. Provide a detailed description of the formula or equation or theorem in Markdown syntax.
            3. Provide the LaTeX code representation of the formula or equation, wrapped in $$ for display math mode, with single backslashes for LaTeX commands.
            4. Don't include any HTML tags in your response. 
            5. If there are no equations or formulas with respect to the user's query, then show laws or theory or any professional relevant information.
            6. Include only fact-based professional results. 
            7. For latexCode, you don't have to include explanation of symbols.`,

        schema: z.object({
            formulas: z.array(
                z.object({
                    name: z.string().describe(`Name of a formula, equation or theorems based on user's query.`),
                    description: z.string().describe('Specific detailed explanation of formula, equation, or theorem.'),
                    latexCode: z.string().describe('The LaTeX code representation of the formula, equation or theorem, wrapped in $$ for display math mode.')
                })
            )
        }),
        maxRetries: 20,
    });


    if (object) {
        history.update(object);
    }
    console.log(object);

    return object;
}

export const AI = createAI<AIState, UIState>({
    actions: {
        directSearchAction,
        imageToLatexAction,
        submitInputAction,
    },
    initialUIState: [],
    initialAIState: { interactions: [], messages: [] },
})
