import 'server-only'

import * as React from 'react';
import { google } from '@ai-sdk/google'
import { CoreMessage, streamObject, streamText, ToolInvocation } from 'ai'
import {
    createAI,
    createStreamableUI,
    getMutableAIState,
    createStreamableValue,
    streamUI
} from 'ai/rsc'
import { nanoid } from './utils';
import { z } from 'zod';
import { GoogleGenerativeAI } from '@google/generative-ai'
import { SpinnerMessage } from '@/components/ui/icons';
import { Loading } from '@/components/loading';
import { Chat } from './types';
import { BotMessage } from '@/components/message';


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



async function submitInputAction(content: string) {
    'use server';
    const aiState = getMutableAIState()

    aiState.update({
        ...aiState.get(),
        messages: [
            ...aiState.get().messages,
            {
                id: nanoid(),
                role: 'user',
                content: `${aiState.get().interactions.join('\n\n')}\n\n${content}`
            }
        ]
    })

    const history = aiState.get().messages.map((message: { role: string; content: string; }) => ({
        role: message.role,
        content: message.content
    }))
    // console.log(history)

    const textStream = createStreamableValue('')
    const spinnerStream = createStreamableUI(<SpinnerMessage />)
    const messageStream = createStreamableUI(null)
    const uiStream = createStreamableUI()


        ; (async () => {
            try {
                const result = await streamText({
                    model: google('models/gemini-1.5-pro'),
                    temperature: 0,
                    tools: {

                    },
                    system: `You are an AI specialized in providing detailed information on equations or formulas or theorem in the fields of mathematics, engineering, and science.
                When a user provides the name of an equation or formula, respond with the following:

                1. **Formula Name**: Provide the name of the formula or equation or theorem.
                2. **Description**: Offer a detailed description of the formula or equation.
                3. **Usage**: Describe the applications or usage of the formula or equation. Ensure the response is complete and specific to various contexts. Ensure single backslashes for LaTeX commands.
                4. **LaTeX Code**: Provide the LaTeX code representation of the formula or equation, wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.
                5. **Explanation of Symbols**: Provide the human-readable renderd version of symbols or variables. This should include subscripts for any integral bounds. Wrapped in $$ for display math mode. Ensure single backslashes for LaTeX commands.
                
                Only respond to queries that are relevant to these fields. If the user input is not a formula name, respond with "Invalid input. Please try again. Make sure to type the name of a formula."`,
                    messages: [...history]
                })

                let textContent = ''
                spinnerStream.done(null)
                for await (const delta of result.fullStream) {
                    const { type } = delta
                    if (type === 'text-delta') {
                        const { textDelta } = delta

                        textContent += textDelta
                        messageStream.update(<BotMessage content={textContent} />)

                        aiState.update({
                            ...aiState.get(),
                            messages: [
                                ...aiState.get().messages,
                                {
                                    id: nanoid(),
                                    role: 'assistant',
                                    content: textContent
                                }
                            ]
                        })
                    } else if (type === 'tool-call-delta') {
                        const { toolName } = delta

                    }
                }



                uiStream.done()
                textStream.done()
                messageStream.done()
            } catch (e) {
                console.error(e)

                const error = new Error(
                    'The AI got rate limited, please try again later.'
                )
                uiStream.error(error)
                textStream.error(error)
                messageStream.error(error)
                aiState.done(error)
            }
        })()
    return {
        id: nanoid(),
        display: messageStream.value

    }
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
        console.log(text);

        return {
            id: nanoid(),
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


export const AI = createAI<AIState, UIState>({
    actions: {
        directSearchAction,
        imageToLatexAction,
    },
    initialUIState: [],
    initialAIState: { interactions: [], messages: [] },
})


// export const getUIStateFromAIState = (aiState: Chat) => {
//     return aiState.messages.filter(message => message.role !== 'system').map((message, index) => ({
//         display: message.role === 'assistant' ? (): ()

//     }))

// }