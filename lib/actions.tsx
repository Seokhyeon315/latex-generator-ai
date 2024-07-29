import 'server-only'


import { google } from '@ai-sdk/google'
import { streamObject, streamText } from 'ai'
import {
    createAI,
    createStreamableUI,
    getMutableAIState,
    getAIState,
    createStreamableValue
} from 'ai/rsc'
import { nanoid } from './utils';
import { z } from 'zod';
import { ReactNode } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai'



const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

const systemMessage = `You are an AI specialized in providing detailed information on equations or formulas or theorem in the fields of mathematics, engineering, and science.
                When a user provides the name of an equation or formula, respond with the following:

                1. **Formula Name**: Provide the name of the formula or equation or theorem.
                2. **Description**: Offer a detailed description of the formula or equation.
                3. **Usage**: Describe the applications or usage of the formula or equation. Ensure the response is complete and specific to various contexts. Ensure single backslashes for LaTeX commands.
                4. **LaTeX Code**: Provide the LaTeX code representation of the formula or equation, wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.
                5. **Explanation of Symbols**: Provide the human-readable renderd version of symbols or variables. This should include subscripts for any integral bounds. Wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.
                
                Only respond to queries that are relevant to these fields. If the user input is not a formula name, respond with "Invalid input. Please try again. Make sure to type the name of a formula."`;

const formulaSchema = z.object({
    formulas: z.array(
        z.object({
            formulaName: z.string().describe('The name of the formula or equation.'),
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
                system: systemMessage,
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
// Convert Image to Latex code action
async function imageToLatexAction(imageBase64: string) {
    'use server';

    const aiState = getMutableAIState();
    const spinnerStream = createStreamableUI(null);
    const messageStream = createStreamableUI(null);
    const uiStream = createStreamableUI();

    uiStream.update(
        <div>Image convert processing...</div>
    );

    try {
        const imageData = imageBase64.split(',')[1];
        // console.log('Base64 image data:', imageData); // Added log

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            systemInstruction: `Provide the LaTeX code representation of the formula or equation, wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.
            The LaTeX code representation of the formula or equation, wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.
            `,

        });

        const prompt = 'Convert the formulas in the image to LaTeX code.';
        const image = {
            inlineData: {
                data: imageData,
                mimeType: 'image/png'
            }
        };

        const result = await model.generateContent([prompt, image]);
        const text = await result.response.text(); // Await result text
        console.log('Generated LaTeX code:', text); // Added log

        spinnerStream.done(null);
        messageStream.done(null);

        uiStream.done(
            <div>Processing done.</div>
        );

        aiState.done({
            ...aiState.get(),
            interactions: [{ content: text }]
        });

        return {
            id: nanoid(),
            display: text
        };
    } catch (error) {
        console.error('Error processing image:', error); // Improved log
        uiStream.error(error);
        spinnerStream.error(error);
        messageStream.error(error);
        aiState.done([]);

        return {
            error: 'Failed to process the image. Please try again.'
        };
    }
}


// Use the streamText function with tool calling (maybe with Langchain)
async function multiSearchAction(content: string) {
    'use server'

    // This is used to save/update the previous state of the AI
    const aiState = getMutableAIState()


    aiState.update({
        ...aiState.get(),


    })

    const result = await streamText({
        model: google('models/gemini-1.5-pro'),
        temperature: 0,
        system: `You are an AI specialized in providing equations or formulas in the fields of mathematics, engineering, and science. When a user provides the name of an equation or formula, respond with the rendered version of the equation or formula and its corresponding LaTeX code. Do not respond to any queries that are not relevant to these fields.`,
        tools: {
            // showFields, show
            // Each tool has an object that has description, parameters, and generate: https://sdk.vercel.ai/docs/ai-sdk-rsc/streaming-react-components 
            getFormula: {
                description: 'Get a formula/equation for a name that user inputs.',
                parameters: z.object({ formulaName: z.string() }),
                generate: async () => {

                }

            },
            getLatex: {
                description: 'Get the LaTeX code for the corresponding formula.',
                parameters: z.object({})
            },
            // chooseGreekCharacters: {
            //     description: 'Choose Greek characters for the left-hand side (LHS) and right-hand side (RHS) respectively from the generated LaTeX code, or just use the generated code.',
            //     parameters: z.object({
            //         lhs: z.string().optional().describe('Optional Greek character for the LHS'),
            //         rhs: z.string().optional().describe('Optional Greek character for the RHS'),
            //         useGenerated: z.boolean().describe('Flag to use the generated LaTeX code without modifications')
            //     })
            // }
        }
    })

    //     return {
    //         id: nanoid(),
    //         display: result.value
    //     }
}


// Define the AI state and UI state types
export type AIState = Array<{
    id?: string;
    // name?: 'getFormula' | 'getLatex';
    content: string;
    latexCode?: string;
}>;

export type UIState = Array<{
    id: string;
    display: ReactNode;
    attachments?: React.ReactNode
}>;



export const AI = createAI<AIState, UIState>({
    actions: {
        directSearchAction,
        imageToLatexAction,
        // multiSearchAction,
    },
    initialUIState: [],
    initialAIState: [],
})

