/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import 'server-only'

import { google } from '@ai-sdk/google'
import { generateText, streamText } from "ai";
import { createAI, streamUI, getMutableAIState } from 'ai/rsc';
import { nanoid } from './utils';
import { z } from 'zod';

async function searchFormulaAction(input: string) {
    'use server'

    const ui = await streamUI({
        model: google('models/gemini-1.5-pro'),
        system: `You are an AI specialized in providing equations or formulas in the fields of mathematics, engineering, and science. When a user provides the name of an equation or formula, respond with the rendered version of the equation or formula and its corresponding LaTeX code. Do not respond to any queries that are not relevant to these fields.`,
        prompt: input,
        text: async ({ content }) => <div>{content}</div>,
        tools: {
            getFormula: {
                description: 'Search for a specific formula based on user input.',
                parameters: z.object({
                    renderedFormula: z.string().describe('Give me a rendered version of formula/equation.'),
                    description: z.string().describe('Explain the formula/equation and its usage.')
                })
            },
            getLatex: {
                description: 'Get the LaTeX code for the corresponding formula.',
                parameters: z.object({
                    formulaName: z.string().describe('The name of the formula to get LaTeX code for')
                })
            },
            chooseGreekCharacters: {
                description: 'Choose Greek characters for the left-hand side (LHS) and right-hand side (RHS) respectively from the generated LaTeX code, or just use the generated code.',
                parameters: z.object({
                    lhs: z.string().optional().describe('Optional Greek character for the LHS'),
                    rhs: z.string().optional().describe('Optional Greek character for the RHS'),
                    useGenerated: z.boolean().describe('Flag to use the generated LaTeX code without modifications')
                })
            }
        }
    })
}

export type AIState = {
    searchId: string
}

export type UIState = {
    id: string
    display: React.ReactNode
    spinner?: React.ReactNode
    attachments?: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
    actions: {
        searchFormulaAction,
    },
    // List of UI messages
    initialUIState: [],
    // List of AI messages
    initialAIState: { searchId: nanoid() },
})
