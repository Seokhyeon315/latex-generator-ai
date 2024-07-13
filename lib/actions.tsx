// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import 'server-only'


import { GoogleGenerativeAI } from "@google/generative-ai";

// This server actions can be directly called from the client

const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

async function searchFormula() {
    'use server'


}