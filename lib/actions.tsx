
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// import 'server-only'
'use server'

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

async function directSearchAction(userInput: string) {
    'use server'

    const objectStream = createStreamableValue();

    ; (async () => {
        try {
            const { partialObjectStream } = await streamObject({
                model: google('models/gemini-1.5-pro'),
                temperature: 0,
                system: `You are an AI specialized in providing detailed information on equations and formulas in the fields of mathematics, engineering, and science. 
                When a user provides the name of an equation or formula, respond with the following:
                1. **Formula Name**: The name of the formula or equation.
                2. **Description**: A detailed description of the formula or equation.
                3. **Usage**: The application or usage of the formula or equation.
                4. **Explanation**: An explanation of each symbol in the formula, covering both the left-hand side (LHS) and right-hand side (RHS).
                5. **LaTeX Code**: The LaTeX code representation of the formula or equation.

                Do not respond to any queries that are not relevant to these fields.`,
                prompt: userInput,
                schema: z.object({
                    formulas: z.array(
                        z.object({
                            formulaName: z.string().describe('The name of the formula or equation.'),
                            description: z.string().describe(`A detailed description of the formula or equation with given ${userInput}`),
                            usuage: z.string().describe(`The usage or application of the formula or equation with given ${userInput}`),
                            renderedFormula: z.string().describe(`The rendered version of the formula or equation with given ${userInput}`),
                            where: z.string().describe(`Explanation of each symbol in the formula, including both LHS and RHS.`),
                            latexCode: z.string().describe(`The LaTeX code representation of the formula or equation with given ${userInput}`),
                        }),
                    ),
                }),
            });

            for await (const partialObject of partialObjectStream) {
                objectStream.update(partialObject)
                console.log(partialObject);
            }

            objectStream.done()

        } catch (e) {
            console.error(e)
            objectStream.error(e)
        }

    })();

    return { object: objectStream.value }

}

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


// Convert Image to Latex code action
//async function imageToLatexAction(image: string) { }

// Define the AI state and UI state types
export type AIState = Array<{
    id?: string;
    name?: 'getFormula' | 'getLatex';
    content: string;
}>;

export type UIState = Array<{
    id: string;
    display: ReactNode;
}>;



export const AI = createAI<AIState, UIState>({
    actions: {
        directSearchAction,
        // multiSearchAction,
    },
    initialUIState: [],
    initialAIState: [],
})

