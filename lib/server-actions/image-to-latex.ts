'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { nanoid } from '../utils';

const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
);

export async function imageToLatexAction(imageBase64: string) {
    try {
        // ... implementation
    } catch (error) {
        console.error('Error processing image:', error);
        return {
            id: nanoid(),
            display: 'An error occurred while processing the image.'
        };
    }
} 