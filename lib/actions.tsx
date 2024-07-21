// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import 'server-only'


import { google } from '@ai-sdk/google'
//import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateText } from "ai";


// export const genAI = new GoogleGenerativeAI(
//     process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
// )

export async function searchFormulaAction(formData: FormData) {
    'use server'

    const userInput = formData.get('search') as string; //get name of the input in the form
    const result = await generateText({
        model: google('models/gemini-1.5-pro'),
        temperature: 0,
        system: `You are an AI specialized in providing equations and formulas 
            in the fields of mathematics, engineering, and science. 
            When a user provides the name of an equation or formula, respond with the rendered version of the equation or formula and its corresponding LaTeX code. Do not respond to any queries that are not relevant to these fields.`,
        prompt: `Give me the rendered version of ${userInput} and its corresponding Latex code.`
    });
    console.log(result)


}
