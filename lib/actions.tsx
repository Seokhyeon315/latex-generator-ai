
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// import 'server-only'
'use server'

import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import {
    createAI,
    createStreamableUI,
    getMutableAIState,
    getAIState,
    createStreamableValue
} from 'ai/rsc'
import { nanoid } from './utils';
import { z } from 'zod';
import React, { ReactNode } from 'react';

async function directSearchAction(userInput: string) {
    'use server'

    const textStream = createStreamableValue('');

    ; (async () => {
        try {
            const result = await streamText({
                model: google('models/gemini-1.5-pro'),
                temperature: 0,
                system: `\You are an AI specialized in providing equations and formulas 
                    in the fields of mathematics, engineering, and science. 
                    When a user provides the name of an equation or formula, respond with the rendered version of the equation or formula and its corresponding LaTeX code. Do not respond to any queries that are not relevant to these fields`,
                prompt: `Give me the rendered version of ${userInput} and its corresponding Latex code.`,
            })

            for await (const textPart of result.textStream) {
                textStream.update(textPart)
                console.log(textPart);
            }

            textStream.done()

        } catch (e) {
            console.error(e)
            textStream.error(e)
        }

    })();

    return { output: textStream.value }

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
    // toolInvocations?: ToolInvocation[];
}>;



export const AI = createAI<AIState, UIState>({
    actions: {
        directSearchAction,
        // multiSearchAction,
    },
    initialUIState: [],
    initialAIState: [],
})

